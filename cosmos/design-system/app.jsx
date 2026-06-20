import { CosmosHeader, CosmosSidebar, CosmosMark } from "../shell.jsx";

const { useState } = React;

const sections = [
  ["foundations", "01", "Foundations"],
  ["type", "02", "Typography"],
  ["components", "03", "Components"],
  ["patterns", "04", "Report patterns"],
  ["principles", "05", "Principles"],
];

const colors = [
  ["Cosmos Navy", "#111C4E", "Primary ink, dark surfaces", "navy"],
  ["Lemon Signal", "#F2F04F", "Attention, active state", "yellow"],
  ["Magenta Field", "#F14F9B", "Emphasis, progress, action", "pink"],
  ["Report Paper", "#F7F4ED", "Primary reading surface", "paper"],
  ["Archive Paper", "#EEE9DE", "Secondary surfaces", "paper-deep"],
  ["Muted Ink", "#66708B", "Supporting information", "muted"],
];

function App() {
  const [copied, setCopied] = useState("");

  const copy = async value => {
    await navigator.clipboard?.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(""), 1200);
  };

  return (
    <div>
      <CosmosHeader meta="Design system · v1.0" />
      <CosmosSidebar active="design" />

      <main>
        <section className="intro" id="foundations">
          <p className="overline">01 / Foundations</p>
          <h2>Research rigor,<br /><em>with a pulse.</em></h2>
          <p className="lede">Cosmos combines the authority of an editorial research report with the energy of a public message wall. The system is quiet enough to read and vivid enough to navigate.</p>
          <div className="principle-strip">
            <span>Editorial structure</span><span>Spatial cues</span><span>Selective color</span><span>Inspectable evidence</span>
          </div>

          <header className="section-head"><div><span>01.1</span><h3>Color</h3></div><p>Three assertive colors sit on warm paper. Navy carries authority, lemon signals orientation, and magenta marks movement or emphasis.</p></header>
          <div className="color-grid">
            {colors.map(([name, hex, use, className]) => (
              <button className="color-card" key={name} onClick={() => copy(hex)}>
                <span className={`swatch ${className}`}><i>{copied === hex ? "Copied" : "Aa"}</i></span>
                <b>{name}</b><code>{hex}</code><p>{use}</p>
              </button>
            ))}
          </div>

          <header className="section-head"><div><span>01.2</span><h3>Spacing & shape</h3></div><p>A restrained 4px base grid supports both dense annotations and generous report pages. Most surfaces stay square; circles indicate movement and systems.</p></header>
          <div className="token-board">
            {[4, 8, 14, 20, 30, 42, 64].map(size => <div key={size}><i style={{ width: size, height: size }} /><code>{size}px</code></div>)}
          </div>
          <div className="shape-row"><div><i className="shape square" /><p><b>Square</b> Evidence and documents</p></div><div><i className="shape pill" /><p><b>Pill</b> State and filters</p></div><div><i className="shape circle" /><p><b>Circle</b> Space and movement</p></div></div>
        </section>

        <section id="type">
          <p className="overline">02 / Typography</p>
          <div className="type-intro"><h2>Voice changes<br /><em>with function.</em></h2><p>Fraunces carries the reflective research voice. DM Sans handles navigation, data, labels, and instructions.</p></div>
          <div className="font-specimen serif-specimen"><div><span>Display / Fraunces 600</span><code>72 / 68 / −4%</code></div><p>Messages<br />become <em>places.</em></p></div>
          <div className="font-specimen sans-specimen"><div><span>Interface / DM Sans</span><code>12 / 16 / +10%</code></div><p>READ · MOVE · NOTICE · RETURN</p></div>
          <div className="type-scale">
            <div><span>Display</span><p className="t-display">The wall remembers.</p><code>68px / 1.02</code></div>
            <div><span>Heading</span><p className="t-heading">Design for quiet readers first.</p><code>34px / 1.12</code></div>
            <div><span>Body lead</span><p className="t-lead">A community wall you can walk into.</p><code>20px / 1.55</code></div>
            <div><span>Body</span><p className="t-body">Distance, density, and adjacency become part of how people understand a discussion.</p><code>14px / 1.65</code></div>
            <div><span>Label</span><p className="t-label">Secondary research · Finding 03</p><code>11px / +15%</code></div>
          </div>
        </section>

        <section id="components">
          <p className="overline">03 / Components</p>
          <div className="type-intro"><h2>Small parts,<br /><em>clear jobs.</em></h2><p>Components avoid ornamental ambiguity. Every visual treatment indicates hierarchy, evidence, state, or action.</p></div>
          <header className="section-head"><div><span>03.1</span><h3>Actions</h3></div><p>Use magenta for the primary action, navy for a grounded alternative, and text links for low-pressure movement.</p></header>
          <div className="component-stage action-stage">
            <button className="button primary-button">Open prototype <span>↗</span></button>
            <button className="button secondary-button">Read methods</button>
            <button className="button ghost-button">View sources <span>→</span></button>
            <a className="inline-link" href="#patterns">Continue reading <i>↓</i></a>
          </div>

          <header className="section-head"><div><span>03.2</span><h3>Evidence cards</h3></div><p>A letter anchors each finding. Color increases distinction, while a repeated internal structure keeps the set comparable.</p></header>
          <div className="evidence-samples">
            <article className="yellow"><span>A</span><h4>Quiet reading is participation</h4><p>People build context before they contribute.</p><b>Design for readers first.</b></article>
            <article className="pink"><span>B</span><h4>The wall predates the feed</h4><p>Public surfaces already make community spatial.</p><b>Rebuild the wall.</b></article>
            <article className="navy"><span>C</span><h4>Space supports orientation</h4><p>Location can become a retrieval cue.</p><b>Let place carry meaning.</b></article>
          </div>

          <header className="section-head"><div><span>03.3</span><h3>Controls & status</h3></div><p>Controls are compact, explicit, and keyboard-visible. State is communicated through words as well as color.</p></header>
          <div className="component-stage controls-stage">
            <div className="tabs"><button className="active">Reader</button><button>Community</button><button>System</button></div>
            <label className="field"><span>Research lens</span><select><option>Spatial memory</option><option>Reading comfort</option></select></label>
            <span className="status"><i /> Study active</span><span className="tag">Primary research</span>
          </div>
        </section>

        <section id="patterns">
          <p className="overline">04 / Report patterns</p>
          <div className="type-intro"><h2>Pages should feel<br /><em>mapped, not stacked.</em></h2><p>Repeated report patterns help readers locate themselves and understand what kind of information they are seeing.</p></div>
          <div className="pattern-grid">
            <article className="pattern chapter-pattern"><div><span>02</span><b>Secondary research</b></div><h3>The feed is optimized for momentum. <em>The wall is optimized for orientation.</em></h3><p>Use for a major chapter opening.</p></article>
            <article className="pattern metric-pattern"><span>Study metrics</span><div><b>06</b><p>Comparative<br />user tests</p></div><div><b>30–50</b><p>Survey<br />responses</p></div><small>Use quantities to establish study scale.</small></article>
            <article className="pattern quote-pattern"><span>Big conclusion</span><blockquote>Cosmos is not validated yet, but it is now researchable.</blockquote><small>Use once per report for the central synthesis.</small></article>
            <article className="pattern note-pattern"><span>Field note / 04</span><p>Listen for the moment when reading becomes participation.</p><small>Use for observations, prompts, and researcher guidance.</small></article>
          </div>
        </section>

        <section id="principles">
          <p className="overline">05 / Principles</p>
          <div className="closing-grid"><div><h2>Keep the system<br /><em>honest.</em></h2><p>Cosmos should never use spatial or visual novelty to hide weak evidence.</p></div><ol>
            <li><span>01</span><div><b>Orientation before decoration</b><p>Every visual cue should help the reader know where they are, what matters, or where to go next.</p></div></li>
            <li><span>02</span><div><b>Evidence before certainty</b><p>Separate findings, hypotheses, and future bets. Do not make research look more conclusive than it is.</p></div></li>
            <li><span>03</span><div><b>Contrast without noise</b><p>Reserve lemon and magenta for moments that need distinction. Most reading happens on paper.</p></div></li>
            <li><span>04</span><div><b>Motion with purpose</b><p>Use motion only to clarify progress, spatial relationship, or state—and honor reduced-motion settings.</p></div></li>
          </ol></div>
          <footer><CosmosMark /><p>Cosmos design system · Version 1.0</p><a href="../">Return to report ↑</a></footer>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
