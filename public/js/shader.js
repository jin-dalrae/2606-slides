/** WebGL slide backgrounds (aurora / waves / plasma / cloudflare). */
export const animatedBackgroundModes = new Set(["shader", "cloudflare", "waves", "plasma"]);

function shaderFragmentMain(variant) {
  if (variant === "waves") {
    return `
      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5*uRes)/uRes.y;
        float t = uTime*0.18;
        vec2 m = (uMouse - 0.5*uRes)/uRes.y;
        float md = exp(-2.2*length(uv-m));
        vec3 col = ink;
        for(int i=0;i<4;i++){
          float fi = float(i);
          float y = uv.y
            + 0.18*sin(uv.x*2.2 + t + fi*1.7)
            + 0.10*sin(uv.x*4.5 - t*1.3 + fi)
            + 0.05*md;
          float band = exp(-26.0*y*y);
          vec3 c = mix(cyan, lime, fract(fi*0.37 + t*0.12));
          col += c * band * 0.6;
        }
        col += lime * md * 0.22;
        float vig = smoothstep(1.3, 0.15, length(uv));
        col *= mix(VIGLOW, 1.0, vig);
        col += (hash(gl_FragCoord.xy + uTime)-0.5)*GRAIN;
        gl_FragColor = vec4(col, 1.0);
      }
    `;
  }

  if (variant === "plasma") {
    return `
      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5*uRes)/uRes.y;
        float t = uTime*0.25;
        vec2 m = (uMouse - 0.5*uRes)/uRes.y;
        float md = exp(-2.5*length(uv-m));
        float v = 0.0;
        v += sin(uv.x*3.0 + t);
        v += sin((uv.y*3.0 + t)*1.2);
        v += sin((uv.x+uv.y)*2.5 + t*0.8);
        v += sin(length(uv*4.0 - m*2.0) - t*1.4 + md*3.0);
        v *= 0.25;
        vec3 col = ink;
        col = mix(col, cyan, 0.5 + 0.5*sin(v*3.14159));
        col = mix(col, lime, 0.5 + 0.5*cos(v*3.14159 + 1.5));
        col = mix(ink, col, 0.62 + 0.2*md);
        float vig = smoothstep(1.3, 0.2, length(uv));
        col *= mix(VIGLOW, 1.0, vig);
        col += (hash(gl_FragCoord.xy + uTime)-0.5)*GRAIN;
        gl_FragColor = vec4(col, 1.0);
      }
    `;
  }

  return `
    void main(){
      vec2 uv = (gl_FragCoord.xy - 0.5*uRes)/uRes.y;
      float t = uTime*0.07;
      vec2 q = uv*1.3;
      q += 0.32*vec2(fbm(q+t), fbm(q-t+5.2));
      float n = fbm(q*1.6 + t);
      vec2 m = (uMouse - 0.5*uRes)/uRes.y;
      float md = exp(-2.5*length(uv-m));
      n += 0.22*md;
      vec3 col = ink;
      col = mix(col, cyan*0.55, smoothstep(0.35, 0.75, n));
      col = mix(col, lime*0.85, smoothstep(0.62, 0.92, n+0.08*md));
      float vig = smoothstep(1.25, 0.2, length(uv));
      col *= mix(VIGLOW, 1.0, vig);
      col += (hash(gl_FragCoord.xy + uTime)-0.5)*GRAIN;
      gl_FragColor = vec4(col, 1.0);
    }
  `;
}

export function initShaderBackground(canvas, theme = "dark", variant = "shader", options = {}) {
  // Static backgrounds (plain / ivory / gray) hide the canvas in CSS — skip GL entirely.
  const printPdfMode = Boolean(options.printPdfMode);
  if (!animatedBackgroundModes.has(variant) || printPdfMode) {
    return () => {};
  }

  const gl = canvas.getContext("webgl", {
    antialias: false,
    premultipliedAlpha: false,
    powerPreference: "low-power"
  });

  if (!gl) {
    return () => {};
  }

  const cloudflare = variant === "cloudflare";

  const palette = cloudflare
    ? theme === "light"
      ? {
          ink: "vec3(0.995, 0.975, 0.955)",
          cyan: "vec3(0.96, 0.51, 0.12)",
          lime: "vec3(0.99, 0.78, 0.36)",
          vignetteLow: "0.97",
          grain: "0.01"
        }
      : {
          ink: "vec3(0.10, 0.055, 0.025)",
          cyan: "vec3(0.97, 0.51, 0.12)",
          lime: "vec3(0.99, 0.74, 0.28)",
          vignetteLow: "0.42",
          grain: "0.04"
        }
    : theme === "light"
      ? {
          ink: "vec3(0.985, 0.955, 0.965)",
          cyan: "vec3(0.58, 0.28, 0.38)",
          lime: "vec3(1.0, 0.82, 0.88)",
          vignetteLow: "0.98",
          grain: "0.008"
        }
      : {
          ink: "vec3(0.045, 0.055, 0.10)",
          cyan: "vec3(0.20, 0.75, 0.95)",
          lime: "vec3(0.70, 0.98, 0.35)",
          vignetteLow: "0.5",
          grain: "0.04"
        };

  const vert = "attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }";
  const frag = `
    precision highp float;
    uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;
    #define INK ${palette.ink}
    #define CYAN ${palette.cyan}
    #define LIME ${palette.lime}
    #define VIGLOW ${palette.vignetteLow}
    #define GRAIN ${palette.grain}
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
    float noise(vec2 p){
      vec2 i=floor(p), f=fract(p);
      float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
      vec2 u=f*f*(3.-2.*f);
      return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
    }
    float fbm(vec2 p){ float v=0., a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }
    vec3 ink = INK; vec3 cyan = CYAN; vec3 lime = LIME;
    ${shaderFragmentMain(variant)}
  `;

  function compile(type, src) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
  }

  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "uRes");
  const uTime = gl.getUniformLocation(prog, "uTime");
  const uMouse = gl.getUniformLocation(prog, "uMouse");
  const mouse = { x: 0, y: 0 };
  let raf = 0;
  let running = false;
  const start = performance.now();
  // Cap pixel ratio on small/battery devices; full 2x is rarely worth the fill rate.
  const maxDpr = window.matchMedia("(max-width: 900px), (prefers-reduced-motion: reduce)").matches
    ? 1
    : 1.5;

  function onMove(event) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    mouse.x = (event.clientX - rect.left) * dpr;
    mouse.y = (rect.height - (event.clientY - rect.top)) * dpr;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function drawFrame() {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (performance.now() - start) / 1000);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function loop() {
    if (!running) {
      return;
    }
    drawFrame();
    raf = window.requestAnimationFrame(loop);
  }

  function setRunning(shouldRun) {
    if (shouldRun === running) {
      return;
    }
    running = shouldRun;
    if (running) {
      raf = window.requestAnimationFrame(loop);
    } else {
      window.cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function onVisibility() {
    setRunning(document.visibilityState === "visible");
  }

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisibility);
  resize();
  setRunning(document.visibilityState === "visible");

  return () => {
    setRunning(false);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", onVisibility);
    try {
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    } catch {
      // ignore
    }
  };
}

