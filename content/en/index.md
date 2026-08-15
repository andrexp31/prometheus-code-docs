---
title: Prometheus Code — Free your code
---

<header class="hero">
  <div class="hero-grid"></div>
  <div class="wrap" style="position:relative;">
    <h1>
      <span class="brand">Prometheus Code</span>
      <span class="tag">Free your code.</span>
    </h1>
    <p class="sub">A fork of VS Code with <b>agents that work for you</b> — local models, embedded terminal and persistent memory.</p>
    <div class="hero-btns">
      <a class="btn primary" href="#descargas">Download for Linux (.deb)</a>
      <a class="btn outline" href="#descargas">Download</a>
    </div>
    <p class="hero-meta">Web · Insiders · Other platforms · By using Prometheus Code you accept its <a href="#">license</a> and <a href="#">privacy policy</a></p>
  </div>
</header>

<section>
  <div class="wrap">
    <div class="sec-head">
      <h2>Agents that build for you</h2>
      <p>Prometheus AI automatically selects among 423 specialized agents to plan, modify code, run commands and iterate until the task is done.</p>
    </div>
    <div class="pair">
      <div class="codewin">
        <div class="winbar"><div class="dot r"></div><div class="dot y"></div><div class="dot g"></div><span>prometheus — chat</span></div>
        <pre><span class="c-cm"># The AI picks the specialist on its own</span>
<span class="c-kw">search_agents</span>(<span class="c-str">"python testing"</span>)
<span class="c-cm">→ 1. python-tester [Development] (catalog)</span>
<span class="c-kw">use_agent</span>(<span class="c-str">"python-tester"</span>)
<span class="c-cm">→ Adopting role: python-tester…</span>
$ <span class="c-fn">pytest</span> tests/ <span class="c-num">--maxfail=1</span>
<span class="c-str">✓ 184 tests passed</span> <span class="c-cm">(exit code: 0)</span></pre>
      </div>
      <div>
        <h3>The right agent, at the right time</h3>
        <p>No manual selection: the local model searches among hundreds of specialists and adopts its role in the same conversation.</p>
        <ul>
          <li>Keyword search with scoring (name, description, category)</li>
          <li>423 agents from the catalog + your installed files</li>
          <li>Agent tools always available to the AI</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="sec-head">
      <h2>Any model, fully local</h2>
      <p>Integrated llama.cpp: search models on Hugging Face and run Gemma, Qwen or Llama on your own GPU, without sending anything to the cloud.</p>
    </div>
    <div class="tiles">
      <div class="tile"><div class="icon">🖥️</div><h4>Local models</h4><p>Integrated llama.cpp server with extensible context and quantized KV.</p></div>
      <div class="tile"><div class="icon">📦</div><h4>Download from HF</h4><p>Hugging Face model search with quantization detection.</p></div>
      <div class="tile"><div class="icon">💬</div><h4>Chat in Spanish</h4><p>Reasoning and answers in your language, with persistent context.</p></div>
      <div class="tile"><div class="icon">🧠</div><h4>Persistent memory</h4><p>Remembers conversations between sessions.</p></div>
      <div class="tile"><div class="icon">🖥</div><h4>Embedded AI terminal</h4><p>Commands live in the chat with live output and exit codes.</p></div>
      <div class="tile"><div class="icon">📜</div><h4>History & sessions</h4><p>Continue or restart previous conversations.</p></div>
    </div>
  </div>
</section>

<section id="descargas">
  <div class="wrap">
    <div class="cta">
      <h3>Start building with AI for free</h3>
      <p>No card, no cloud, no subscription — just your GPU and 423 agents.</p>
      <a class="btn" href="#descargas">Download Prometheus Code</a>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="sec-head">
      <h2>A world-class editor at its core</h2>
      <p>All the power of VS Code preserved: editing, debugging, Git and extensions.</p>
    </div>
    <div class="pair rev">
      <div class="codewin">
        <div class="winbar"><div class="dot r"></div><div class="dot y"></div><div class="dot g"></div><span>main.py</span></div>
        <pre><span class="c-kw">import</span> numpy <span class="c-kw">as</span> np
<span class="c-kw">def</span> <span class="c-fn">describe</span>(species):
    subset = iris[iris[<span class="c-str">"species"</span>] == species]
    <span class="c-kw">return</span> subset[[<span class="c-str">"petal"</span>, <span class="c-str">"sepal"</span>]].agg([<span class="c-str">"mean"</span>, <span class="c-str">"std"</span>])</pre>
      </div>
      <div>
        <h3>Smart editing, debugging and more</h3>
        <p>Completions, syntax highlighting, integrated version control and Live Preview for your web projects.</p>
      </div>
    </div>
    <div style="height:28px"></div>
    <div class="chips">
      <span class="chip"><span class="sq blue"></span>JavaScript</span>
      <span class="chip"><span class="sq red"></span>Python</span>
      <span class="chip"><span class="sq yellow"></span>TypeScript</span>
      <span class="chip"><span class="sq green"></span>C#</span>
      <span class="chip"><span class="sq purple"></span>Java</span>
      <span class="chip"><span class="sq cyan"></span>HTML</span>
      <span class="chip"><span class="sq orange"></span>JSON</span>
      <span class="chip"><span class="sq pink"></span>Markdown</span>
    </div>
  </div>
</section>

<section id="features">
  <div class="wrap">
    <div class="sec-head"><h2>Features we keep and improve</h2></div>
    <div class="fgrid">
      <div class="fcard"><div class="ficon">⌨</div><h5>Integrated terminal</h5><p>fish, zsh, bash inside the editor</p></div>
      <div class="fcard"><div class="ficon">⚡</div><h5>Run & Debug</h5><p>Without leaving the editor</p></div>
      <div class="fcard"><div class="ficon">🌿</div><h5>Integrated Git</h5><p>Native version control</p></div>
      <div class="fcard"><div class="ficon">🧩</div><h5>Extensions</h5><p>Open VSX, free and open</p></div>
      <div class="fcard"><div class="ficon">🎨</div><h5>Themes</h5><p>Your editor, your style</p></div>
      <div class="fcard"><div class="ficon">▶</div><h5>Live Preview</h5><p>Embedded Vite for your web</p></div>
      <div class="fcard"><div class="ficon">🔑</div><h5>Accessibility</h5><p>High contrast and keyboard</p></div>
      <div class="fcard"><div class="ficon">🌐</div><h5>Web</h5><p>Cross-platform</p></div>
    </div>
  </div>
</section>