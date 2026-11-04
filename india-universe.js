/* India-only large-cap universe and browser bulk-history downloader for QuantLab. */
(async function () {
  "use strict";
  const rows = [
    ["ABB","ABB India Ltd.","Capital Goods"],
    ["ADANIENSOL","Adani Energy Solutions Ltd.","Power"],
    ["ADANIENT","Adani Enterprises Ltd.","Metals & Mining"],
    ["ADANIGREEN","Adani Green Energy Ltd.","Power"],
    ["ADANIPORTS","Adani Ports and Special Economic Zone Ltd.","Services"],
    ["ADANIPOWER","Adani Power Ltd.","Power"],
    ["AMBUJACEM","Ambuja Cements Ltd.","Construction Materials"],
    ["APOLLOHOSP","Apollo Hospitals Enterprise Ltd.","Healthcare"],
    ["ASIANPAINT","Asian Paints Ltd.","Consumer Durables"],
    ["DMART","Avenue Supermarts Ltd.","Consumer Services"],
    ["AXISBANK","Axis Bank Ltd.","Financial Services"],
    ["BSE","BSE Ltd.","Financial Services"],
    ["BAJAJ-AUTO","Bajaj Auto Ltd.","Automobile"],
    ["BAJFINANCE","Bajaj Finance Ltd.","Financial Services"],
    ["BAJAJFINSV","Bajaj Finserv Ltd.","Financial Services"],
    ["BAJAJHLDNG","Bajaj Holdings & Investment Ltd.","Financial Services"],
    ["BANKBARODA","Bank of Baroda","Financial Services"],
    ["BEL","Bharat Electronics Ltd.","Capital Goods"],
    ["BPCL","Bharat Petroleum Corporation Ltd.","Oil, Gas & Fuels"],
    ["BHARTIARTL","Bharti Airtel Ltd.","Telecommunication"],
    ["BOSCHLTD","Bosch Ltd.","Automobile"],
    ["BRITANNIA","Britannia Industries Ltd.","FMCG"],
    ["CGPOWER","CG Power and Industrial Solutions Ltd.","Capital Goods"],
    ["CANBK","Canara Bank","Financial Services"],
    ["CHOLAFIN","Cholamandalam Investment and Finance Co. Ltd.","Financial Services"],
    ["CIPLA","Cipla Ltd.","Healthcare"],
    ["COALINDIA","Coal India Ltd.","Oil, Gas & Fuels"],
    ["CUMMINSIND","Cummins India Ltd.","Capital Goods"],
    ["DLF","DLF Ltd.","Realty"],
    ["DIVISLAB","Divi's Laboratories Ltd.","Healthcare"],
    ["DRREDDY","Dr. Reddy's Laboratories Ltd.","Healthcare"],
    ["EICHERMOT","Eicher Motors Ltd.","Automobile"],
    ["ETERNAL","Eternal Ltd.","Consumer Services"],
    ["GAIL","GAIL (India) Ltd.","Oil, Gas & Fuels"],
    ["GODREJCP","Godrej Consumer Products Ltd.","FMCG"],
    ["GRASIM","Grasim Industries Ltd.","Construction Materials"],
    ["HCLTECH","HCL Technologies Ltd.","Information Technology"],
    ["HDFCAMC","HDFC Asset Management Company Ltd.","Financial Services"],
    ["HDFCBANK","HDFC Bank Ltd.","Financial Services"],
    ["HDFCLIFE","HDFC Life Insurance Company Ltd.","Financial Services"],
    ["HINDALCO","Hindalco Industries Ltd.","Metals & Mining"],
    ["HAL","Hindustan Aeronautics Ltd.","Capital Goods"],
    ["HINDUNILVR","Hindustan Unilever Ltd.","FMCG"],
    ["HINDZINC","Hindustan Zinc Ltd.","Metals & Mining"],
    ["POWERINDIA","Hitachi Energy India Ltd.","Capital Goods"],
    ["HYUNDAI","Hyundai Motor India Ltd.","Automobile"],
    ["ICICIBANK","ICICI Bank Ltd.","Financial Services"],
    ["ITC","ITC Ltd.","FMCG"],
    ["IOC","Indian Oil Corporation Ltd.","Oil, Gas & Fuels"],
    ["IRFC","Indian Railway Finance Corporation Ltd.","Financial Services"],
    ["INFY","Infosys Ltd.","Information Technology"],
    ["INDIGO","InterGlobe Aviation Ltd.","Services"],
    ["JSWSTEEL","JSW Steel Ltd.","Metals & Mining"],
    ["JINDALSTEL","Jindal Steel Ltd.","Metals & Mining"],
    ["JIOFIN","Jio Financial Services Ltd.","Financial Services"],
    ["KOTAKBANK","Kotak Mahindra Bank Ltd.","Financial Services"],
    ["LTM","LTM Ltd.","Information Technology"],
    ["LT","Larsen & Toubro Ltd.","Construction"],
    ["M&M","Mahindra & Mahindra Ltd.","Automobile"],
    ["MARUTI","Maruti Suzuki India Ltd.","Automobile"],
    ["MAXHEALTH","Max Healthcare Institute Ltd.","Healthcare"],
    ["MAZDOCK","Mazagon Dock Shipbuilders Ltd.","Capital Goods"],
    ["MUTHOOTFIN","Muthoot Finance Ltd.","Financial Services"],
    ["NTPC","NTPC Ltd.","Power"],
    ["NESTLEIND","Nestle India Ltd.","FMCG"],
    ["ONGC","Oil & Natural Gas Corporation Ltd.","Oil, Gas & Fuels"],
    ["PIDILITIND","Pidilite Industries Ltd.","Chemicals"],
    ["POLYCAB","Polycab India Ltd.","Capital Goods"],
    ["PFC","Power Finance Corporation Ltd.","Financial Services"],
    ["POWERGRID","Power Grid Corporation of India Ltd.","Power"],
    ["PNB","Punjab National Bank","Financial Services"],
    ["RELIANCE","Reliance Industries Ltd.","Oil, Gas & Fuels"],
    ["SBILIFE","SBI Life Insurance Company Ltd.","Financial Services"],
    ["MOTHERSON","Samvardhana Motherson International Ltd.","Automobile"],
    ["SHRIRAMFIN","Shriram Finance Ltd.","Financial Services"],
    ["ENRIN","Siemens Energy India Ltd.","Capital Goods"],
    ["SIEMENS","Siemens Ltd.","Capital Goods"],
    ["SOLARINDS","Solar Industries India Ltd.","Chemicals"],
    ["SBIN","State Bank of India","Financial Services"],
    ["SUNPHARMA","Sun Pharmaceutical Industries Ltd.","Healthcare"],
    ["TVSMOTOR","TVS Motor Company Ltd.","Automobile"],
    ["TATACAP","Tata Capital Ltd.","Financial Services"],
    ["TCS","Tata Consultancy Services Ltd.","Information Technology"],
    ["TATACONSUM","Tata Consumer Products Ltd.","FMCG"],
    ["TMCV","Tata Motors Ltd.","Automobile"],
    ["TMPV","Tata Motors Passenger Vehicles Ltd.","Automobile"],
    ["TATAPOWER","Tata Power Co. Ltd.","Power"],
    ["TATASTEEL","Tata Steel Ltd.","Metals & Mining"],
    ["TECHM","Tech Mahindra Ltd.","Information Technology"],
    ["TITAN","Titan Company Ltd.","Consumer Durables"],
    ["TORNTPHARM","Torrent Pharmaceuticals Ltd.","Healthcare"],
    ["TRENT","Trent Ltd.","Consumer Services"],
    ["ULTRACEMCO","UltraTech Cement Ltd.","Construction Materials"],
    ["UNIONBANK","Union Bank of India","Financial Services"],
    ["VBL","Varun Beverages Ltd.","FMCG"],
    ["VAML","Vedanta Aluminium Metal Ltd.","Metals & Mining"],
    ["VEDL","Vedanta Ltd.","Metals & Mining"],
    ["IDEA","Vodafone Idea Ltd.","Telecommunication"],
    ["WIPRO","Wipro Ltd.","Information Technology"],
    ["ZYDUSLIFE","Zydus Lifesciences Ltd.","Healthcare"]
  ];
  let additionalPayload = null;
  let additionalLoadError = null;
  try {
    const response = await fetch("./data/india-additional-500-marketcap.json", { cache: "no-store" });
    if (!response.ok) throw new Error("market-cap universe HTTP " + response.status);
    additionalPayload = await response.json();
    if (!additionalPayload || !Array.isArray(additionalPayload.rows) || additionalPayload.rows.length !== 500) {
      throw new Error("Expected exactly 500 additional market-cap rows.");
    }
    const originalSymbols = new Set(rows.map(function (r) { return r[0]; }));
    const seen = new Set();
    const extraRows = additionalPayload.rows.map(function (item) {
      const symbol = String(item.symbol || "").trim().toUpperCase();
      if (!symbol || originalSymbols.has(symbol) || seen.has(symbol)) throw new Error("Duplicate or blank symbol in additional universe: " + symbol);
      if (!Number.isFinite(Number(item.marketCapCr))) throw new Error("Missing market cap for " + symbol);
      seen.add(symbol);
      return [symbol, item.company, item.sector, Number(item.marketCapCr), Number(item.rank), item.classification || "Additional"];
    });
    if (extraRows.length !== 500 || seen.size !== 500) throw new Error("Additional universe validation failed.");
    rows.push.apply(rows, extraRows);
  } catch (error) {
    additionalLoadError = error;
    console.error("Could not load the additional 500-company universe:", error);
  }
  const stocks = rows.map(function (r) {
    return {
      symbol: r[0], yahoo: r[0] + ".NS", company: r[1], sector: r[2],
      marketCapCr: r[3] == null ? null : Number(r[3]),
      marketCapRank: r[4] == null ? null : Number(r[4]),
      classification: r[5] || "Original Nifty 100",
      universeGroup: r[4] == null ? "nifty100" : "additional500"
    };
  });
  const originalStocks = stocks.filter(function (s) { return s.universeGroup === "nifty100"; });
  const additionalStocks = stocks.filter(function (s) { return s.universeGroup === "additional500"; });
  const $ = function (id) { return document.getElementById(id); };
  const panel = document.createElement("section");
  panel.id = "indiaUniversePanel";
  panel.className = "panel india-universe";
  panel.innerHTML =
    '<div class="panel-head"><div><span class="eyebrow">INDIA EQUITY UNIVERSE / 100 + 500</span><h3>' + stocks.length + ' Indian listed companies</h3><p class="india-subcopy">Original Nifty 100 + 500 additional companies ranked by market capitalisation · INR</p></div><span class="india-tag">' + stocks.length + ' INDIA STOCKS</span></div>' +
    '<div class="india-snapshot-strip"><span><b>500 additions</b> · sorted by latest market cap</span><span>Snapshot: 2 Nov 2026</span><span>Original 100 excluded</span></div>' +
    '<div class="india-toolbar"><div class="india-filter"><label for="indiaSearch">SEARCH COMPANY OR SYMBOL</label><input id="indiaSearch" type="search" placeholder="Search LICI, Tata, banking…"></div><div class="india-filter"><label for="indiaSector">SECTOR</label><select id="indiaSector"><option value="">All sectors</option></select></div><div class="india-filter"><label for="indiaGroup">UNIVERSE</label><select id="indiaGroup"><option value="">All ' + stocks.length + '</option><option value="nifty100">Original Nifty 100</option><option value="additional500">Additional 500 by market cap</option></select></div><div class="india-filter india-date"><label for="bulkStart">HISTORY FROM</label><input id="bulkStart" type="date" value="1970-01-01"></div><div class="india-filter india-date"><label for="bulkEnd">THROUGH</label><input id="bulkEnd" type="date"></div><div class="india-filter"><label for="bulkInterval">FREQUENCY</label><select id="bulkInterval"><option value="1d">Daily</option><option value="1wk">Weekly</option><option value="1mo">Monthly</option></select></div></div>' +
    '<div class="india-selection-row"><div><b id="indiaSelectedCount">100 selected</b><span id="indiaVisibleCount"> · showing ' + stocks.length + ' of ' + stocks.length + '</span></div><div class="india-selection-actions"><button class="button small ghost" id="indiaSelectVisible">Select visible</button><button class="button small ghost" id="indiaClearSelection">Clear selection</button></div></div>' +
    '<div class="india-stock-grid" id="indiaStockList"></div>' +
    '<div class="india-download-panel"><div class="india-download-copy"><b>Full available historical OHLCV</b><span>From the earliest bar Yahoo Finance returns for each company through the selected end date. Each stock can have a different first trading date.</span></div><div class="india-download-actions"><button class="button primary" id="indiaDownloadSelected">↓ Download selected</button><button class="button ghost" id="indiaDownloadAll">↓ Download all 500 additions</button><button class="button ghost" id="indiaDownloadOriginal">↓ Download original 100</button><button class="button ghost" id="indiaUseOne">Use one stock in backtest</button></div></div>' +
    '<div class="india-progress"><div class="india-progress-track"><span id="indiaProgressFill"></span></div><div id="indiaProgressText">Ready · no history downloaded yet. Select a universe and start a download.</div></div><div class="india-failures" id="indiaFailures"></div>' +
    '<div class="india-source-note">Company and current market-cap snapshot: 2 Nov 2026. Candidate companies were taken from the source large-, mid- and small-cap tables, the original 100 were excluded, and the remaining companies were ranked by current market capitalisation. Classification uses six-month average market capitalisation through June 2026. Historical OHLCV is requested on demand from Yahoo Finance; the app does not invent unavailable history. Yahoo is an unofficial data source, not an NSE-authorised feed. <a href="https://stockexact.com/stocks" target="_blank" rel="noreferrer">Market-cap source ↗</a></div>' +
    (additionalLoadError ? '<div class="india-failures">Additional 500-company file could not be loaded: ' + escapeHTML(additionalLoadError.message) + '</div>' : '');
  const dataSummaryPanel = $("dataSummary") && $("dataSummary").closest(".panel");
  if (dataSummaryPanel) dataSummaryPanel.parentNode.insertBefore(panel, dataSummaryPanel);
  else $("page-data").appendChild(panel);

  const today = new Date();
  $("bulkEnd").value = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const sectors = Array.from(new Set(stocks.map(function (s) { return s.sector; }))).sort();
  sectors.forEach(function (sector) {
    const opt = document.createElement("option");
    opt.value = sector; opt.textContent = sector; $("indiaSector").appendChild(opt);
  });
  const selected = new Set(originalStocks.map(function (s) { return s.symbol; }));
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function filteredStocks() {
    const q = $("indiaSearch").value.trim().toLowerCase();
    const sector = $("indiaSector").value;
    const group = $("indiaGroup").value;
    return stocks.filter(function (s) {
      return (!sector || s.sector === sector) &&
        (!group || s.universeGroup === group) &&
        (!q || (s.symbol + " " + s.company + " " + s.sector + " " + s.classification).toLowerCase().indexOf(q) >= 0);
    });
  }
  function updateSelectedCount() {
    $("indiaSelectedCount").textContent = selected.size + " selected";
    $("indiaVisibleCount").textContent = " · showing " + filteredStocks().length + " of " + stocks.length;
  }
  function renderList() {
    const visible = filteredStocks();
    $("indiaStockList").innerHTML = visible.map(function (s) {
      const meta = s.universeGroup === "additional500"
        ? s.symbol + ".NS · #" + s.marketCapRank + " · ₹" + Number(s.marketCapCr).toLocaleString("en-IN") + " Cr"
        : s.symbol + ".NS · Original 100";
      const rankTag = s.universeGroup === "additional500" ? '<small class="india-cap-rank">ADDITION #' + s.marketCapRank + '</small>' : "";
      return '<label class="india-stock"><input type="checkbox" class="india-stock-check" value="' + escapeHTML(s.symbol) + '"' + (selected.has(s.symbol) ? " checked" : "") + '><span class="india-stock-main"><b>' + escapeHTML(s.company) + '</b><small>' + escapeHTML(meta) + '</small>' + rankTag + '</span><span class="india-stock-sector">' + escapeHTML(s.sector) + '</span></label>';
    }).join("") || '<div class="india-empty">No companies match this search.</div>';
    $("indiaStockList").querySelectorAll(".india-stock-check").forEach(function (box) {
      box.addEventListener("change", function () {
        if (box.checked) selected.add(box.value); else selected.delete(box.value);
        updateSelectedCount();
      });
    });
    updateSelectedCount();
  }
  $("indiaSearch").addEventListener("input", renderList);
  $("indiaSector").addEventListener("change", renderList);
  $("indiaGroup").addEventListener("change", renderList);
  $("indiaSelectVisible").addEventListener("click", function () {
    filteredStocks().forEach(function (s) { selected.add(s.symbol); });
    renderList();
  });
  $("indiaClearSelection").addEventListener("click", function () { selected.clear(); renderList(); });

  const datalist = $("tickerSuggestions");
  if (datalist) datalist.remove();
  const tickerInput = $("ticker");
  const tickerWrap = tickerInput.closest(".ticker-wrap");
  tickerInput.removeAttribute("list");
  const tickerMenu = document.createElement("div");
  tickerMenu.id = "tickerAutocomplete";
  tickerMenu.className = "ticker-autocomplete";
  tickerMenu.setAttribute("role", "listbox");
  tickerMenu.hidden = true;
  tickerWrap.appendChild(tickerMenu);
  const tickerHint = document.createElement("div");
  tickerHint.className = "ticker-selection-hint";
  tickerHint.id = "tickerSelectionHint";
  tickerHint.textContent = "Search " + stocks.length.toLocaleString("en-IN") + " NSE-listed companies by name or symbol";
  tickerWrap.appendChild(tickerHint);
  let activeTickerOption = -1;
  let visibleTickerOptions = [];
  function rankedTickerMatches(query) {
    const q = query.trim().toLowerCase();
    const matches = stocks.filter(function (s) {
      return !q || (s.symbol + " " + s.company + " " + s.sector + " " + s.classification).toLowerCase().indexOf(q) >= 0;
    });
    matches.sort(function (a,b) {
      if (!q) return a.company.localeCompare(b.company);
      const aRank = a.symbol.toLowerCase() === q ? 0 : a.symbol.toLowerCase().startsWith(q) ? 1 : a.company.toLowerCase().startsWith(q) ? 2 : 3;
      const bRank = b.symbol.toLowerCase() === q ? 0 : b.symbol.toLowerCase().startsWith(q) ? 1 : b.company.toLowerCase().startsWith(q) ? 2 : 3;
      return aRank-bRank || a.company.localeCompare(b.company);
    });
    return matches;
  }
  function chooseTicker(stock) {
    tickerInput.value = stock.yahoo;
    tickerInput.dataset.selectedSymbol = stock.symbol;
    tickerHint.textContent = stock.company + " · " + stock.sector + " · NSE / INR";
    tickerHint.classList.add("selected");
    tickerMenu.hidden = true;
    tickerInput.setAttribute("aria-expanded","false");
    tickerInput.setAttribute("aria-activedescendant","");
    activeTickerOption = -1;
    tickerInput.dispatchEvent(new Event("change",{bubbles:true}));
  }
  function paintTickerMenu() {
    visibleTickerOptions = rankedTickerMatches(tickerInput.value.replace(/\.NS$/i,""));
    activeTickerOption = -1;
    const query = tickerInput.value.replace(/\.NS$/i,"").trim();
    const matchCount = visibleTickerOptions.length.toLocaleString("en-IN");
    const menuTitle = query
      ? matchCount + " matches for “" + escapeHTML(query) + "”"
      : stocks.length.toLocaleString("en-IN") + " companies in the NSE universe";
    tickerMenu.innerHTML =
      '<div class="ticker-menu-head"><b>' + menuTitle + '</b><span>Scroll to browse · ↑ ↓ to select</span></div>' +
      (visibleTickerOptions.map(function (s,i) {
        return '<button type="button" id="ticker-option-'+i+'" class="ticker-option" role="option" aria-selected="false" data-index="'+i+'"><span class="ticker-option-name">'+escapeHTML(s.company)+'</span><span class="ticker-option-meta"><b>'+escapeHTML(s.symbol)+'.NS</b><small>'+escapeHTML(s.sector)+'</small></span></button>';
      }).join("") || '<div class="ticker-no-match">No Indian-company match. Check the spelling or search by NSE symbol.</div>') +
      (query ? '<button type="button" class="ticker-browse-all">Browse all ' + stocks.length.toLocaleString("en-IN") + ' companies</button>' : '');
    tickerMenu.hidden = false;
    tickerInput.setAttribute("aria-expanded","true");
    tickerMenu.querySelectorAll(".ticker-option").forEach(function (button) {
      button.addEventListener("mousedown",function (event) { event.preventDefault(); });
      button.addEventListener("click",function () { chooseTicker(visibleTickerOptions[Number(button.dataset.index)]); });
    });
    const browseAll = tickerMenu.querySelector(".ticker-browse-all");
    if (browseAll) {
      browseAll.addEventListener("mousedown",function (event) { event.preventDefault(); });
      browseAll.addEventListener("click",function () {
        tickerInput.value = "";
        tickerInput.dataset.selectedSymbol = "";
        tickerHint.textContent = "Browsing all " + stocks.length.toLocaleString("en-IN") + " NSE-listed companies";
        tickerHint.classList.remove("selected");
        paintTickerMenu();
      });
    }
  }
  function setActiveTicker(index) {
    activeTickerOption = Math.max(0,Math.min(index,visibleTickerOptions.length-1));
    tickerMenu.querySelectorAll(".ticker-option").forEach(function (button,i) {
      button.classList.toggle("active",i===activeTickerOption);
      button.setAttribute("aria-selected",i===activeTickerOption?"true":"false");
    });
    const active = tickerMenu.querySelectorAll(".ticker-option")[activeTickerOption];
    if (active) {
      tickerInput.setAttribute("aria-activedescendant",active.id || "");
      active.scrollIntoView({block:"nearest"});
    }
  }
  tickerInput.addEventListener("focus",paintTickerMenu);
  tickerInput.addEventListener("input",function () {
    tickerInput.dataset.selectedSymbol = "";
    tickerHint.textContent = "Choose a company from the suggestions before fetching data";
    tickerHint.classList.remove("selected");
    paintTickerMenu();
  });
  tickerInput.addEventListener("keydown",function (event) {
    if (event.key==="ArrowDown") { event.preventDefault(); if(tickerMenu.hidden)paintTickerMenu(); if(visibleTickerOptions.length)setActiveTicker(activeTickerOption+1); }
    else if (event.key==="ArrowUp") { event.preventDefault(); if(visibleTickerOptions.length)setActiveTicker(activeTickerOption<=0?0:activeTickerOption-1); }
    else if (event.key==="Enter"&&!tickerMenu.hidden) { if(visibleTickerOptions.length){event.preventDefault();chooseTicker(visibleTickerOptions[activeTickerOption<0?0:activeTickerOption]);} }
    else if (event.key==="Escape") { tickerMenu.hidden=true;tickerInput.setAttribute("aria-expanded","false"); }
  });
  tickerInput.addEventListener("blur",function () { setTimeout(function(){tickerMenu.hidden=true;tickerInput.setAttribute("aria-expanded","false");},140); });
  document.addEventListener("click",function(event){if(!tickerWrap.contains(event.target)){tickerMenu.hidden=true;tickerInput.setAttribute("aria-expanded","false");}});

  const source = $("source");
  if (source) source.innerHTML = '<option value="yahoo">Yahoo Finance · Indian NSE symbols</option><option value="sample">Synthetic demo data</option>';
  const tickerLabel = $("ticker") && $("ticker").closest("label");
  if (tickerLabel) tickerLabel.childNodes[0].textContent = "NSE SYMBOL / TICKER";
  const capitalLabel = Array.from(document.querySelectorAll("label")).find(function (el) {
    return el.textContent.indexOf("INITIAL CAPITAL") >= 0;
  });
  if (capitalLabel) capitalLabel.childNodes[0].textContent = "INITIAL CAPITAL (₹ INR)";
  const pageTitle = document.querySelector(".topbar h1");
  if (pageTitle) pageTitle.textContent = "India quantitative research";
  const eyebrow = document.querySelector(".topbar .eyebrow");
  if (eyebrow) eyebrow.textContent = "NSE EQUITY RESEARCH / OVERVIEW";
  const brand = document.querySelector(".brand");
  if (brand) brand.innerHTML = '<span class="brand-mark">Q</span><span>INDIA QUANT<span class="muted">LAB</span><small>NSE EQUITY RESEARCH</small></span>';
  const marketPill = document.querySelector(".market-pill");
  if (marketPill) marketPill.innerHTML = '<i></i> NSE INDIA · INR · HISTORICAL MODE';
  const dataHeading = document.querySelector("#page-data .section-head p");
  if (dataHeading) dataHeading.textContent = "Indian equity data only. Browse all " + stocks.length.toLocaleString("en-IN") + " NSE-listed companies, fetch historical OHLCV bars, or upload your own NSE dataset."
  const navData = document.querySelector('[data-tab="data"] span');
  if (navData) navData.textContent = "India universe";
  const providerCopy = document.querySelector("#page-data .muted-copy");
  if (providerCopy) providerCopy.textContent = "Yahoo Finance chart data for NSE-listed companies (.NS symbols) · historical only · browser CORS relay.";
  const providerRows = document.querySelectorAll("#page-data .provider-row");
  if (providerRows.length > 1) {
    providerRows[0].querySelector("span:first-child").textContent = "Yahoo Finance · NSE symbols";
    providerRows[1].querySelector("span:first-child").textContent = "Indian company universe";
    providerRows[1].querySelector("span:last-child").textContent = stocks.length.toLocaleString("en-IN") + " INDIAN COMPANIES";
  }

  // Restrict both the fetch button and the backtest shortcut to the loaded Indian NSE universe.
  function enforceIndianTicker(event) {
    const input = $("ticker");
    const typed = input.value.trim().toUpperCase().replace(/\.NS$/, "");
    const match = stocks.find(function (s) { return s.symbol === typed; });
    if (!match && $("source").value !== "sample") {
      event.stopImmediatePropagation();
      $("dataStatus").textContent = "Choose an Indian NSE-listed company from the ticker suggestions.";
      $("dataStatus").className = "status error";
      return;
    }
    if (match) input.value = match.yahoo;
  }
  $("loadData").addEventListener("click", enforceIndianTicker, true);
  $("runBacktest").addEventListener("click", enforceIndianTicker, true);

  function localRowsFor(symbol) {
    return stocks.filter(function (s) { return s.symbol === symbol; });
  }
  function csvEscape(value) {
    const text = value === null || value === undefined ? "" : String(value);
    return '"' + text.replace(/"/g, '""') + '"';
  }
  function downloadFile(name, content) {
    const blob = new Blob(["\uFEFF" + content], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }
  function sleep(ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); }
  async function fetchStockHistory(stock, start, end, interval) {
    const p1 = Math.floor(new Date(start + "T00:00:00Z").getTime() / 1000);
    const p2 = Math.floor(new Date(end + "T23:59:59Z").getTime() / 1000) + 1;
    const query = "?period1=" + p1 + "&period2=" + p2 + "&interval=" + interval + "&events=div%2Csplits";
    const hosts = ["query1.finance.yahoo.com", "query2.finance.yahoo.com"];
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      for (const host of hosts) {
        try {
          const url = "https://" + host + "/v8/finance/chart/" + encodeURIComponent(stock.yahoo) + query;
          const response = await fetch("https://proxy.cors.dev/" + url, {
            method: "GET", mode: "cors", credentials: "omit",
            headers: { "Accept": "application/json" }
          });
          if (!response.ok) throw new Error("Yahoo relay HTTP " + response.status);
          const payload = await response.json();
          const result = payload.chart && payload.chart.result && payload.chart.result[0];
          if (!result) throw new Error((payload.chart && payload.chart.error && payload.chart.error.description) || "No Yahoo history returned");
          const quote = result.indicators.quote[0];
          const adjusted = result.indicators.adjclose && result.indicators.adjclose[0] && result.indicators.adjclose[0].adjclose || [];
          const output = (result.timestamp || []).map(function (stamp, i) {
            return {
              date: new Date(stamp * 1000).toISOString().slice(0, 10),
              open: quote.open[i], high: quote.high[i], low: quote.low[i],
              close: quote.close[i], adjClose: adjusted[i] == null ? quote.close[i] : adjusted[i],
              volume: quote.volume[i] == null ? 0 : quote.volume[i]
            };
          }).filter(function (bar) {
            return [bar.open, bar.high, bar.low, bar.close].every(Number.isFinite);
          });
          if (!output.length) throw new Error("No valid OHLCV rows for " + stock.yahoo + " in " + start + " through " + end);
          return output;
        } catch (error) {
          lastError = error;
        }
      }
      if (attempt < 2) await sleep(600 * (attempt + 1));
    }
    throw lastError || new Error("Data provider unavailable");
  }
  function setProgress(done, total, message) {
    $("indiaProgressFill").style.width = (total ? done / total * 100 : 0) + "%";
    $("indiaProgressText").textContent = message;
  }
  async function runBulkDownload(universe) {
    const start = $("bulkStart").value;
    const end = $("bulkEnd").value;
    const interval = $("bulkInterval").value;
    if (!start || !end || start >= end) {
      $("indiaProgressText").textContent = "Choose a valid start date before the end date.";
      return;
    }
    if (!universe.length) {
      $("indiaProgressText").textContent = "Select at least one Indian company.";
      return;
    }
    const buttons = [$("indiaDownloadSelected"), $("indiaDownloadAll"), $("indiaDownloadOriginal")];
    buttons.forEach(function (b) { b.disabled = true; });
    $("indiaFailures").textContent = "";
    $("indiaProgressFill").style.width = "0%";
    const collected = [];
    const failures = [];
    let next = 0, completed = 0;
    async function worker() {
      while (true) {
        const index = next++;
        if (index >= universe.length) return;
        const stock = universe[index];
        try {
          const history = await fetchStockHistory(stock, start, end, interval);
          history.forEach(function (bar) {
            collected.push([bar.date, stock.symbol, stock.company, stock.sector, stock.universeGroup, stock.marketCapRank || "", stock.marketCapCr || "", bar.open, bar.high, bar.low, bar.close, bar.adjClose, bar.volume]);
          });
        } catch (error) {
          failures.push(stock.symbol + " — " + error.message);
        }
        completed++;
        setProgress(completed, universe.length, "Fetching full available history · " + completed + " / " + universe.length + " companies checked · " + collected.length.toLocaleString() + " OHLCV rows · latest: " + stock.company);
      }
    }
    try {
      await Promise.all(Array.from({ length: Math.min(3, universe.length) }, worker));
      if (collected.length) {
        collected.sort(function (a, b) { return a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]); });
        const header = ["Date","Symbol","Company","Sector","Universe","Market Cap Rank","Market Cap (INR Cr)","Open","High","Low","Close","Adj Close","Volume"];
        const csv = [header].concat(collected).map(function (r) { return r.map(csvEscape).join(","); }).join("\r\n");
        const groupName = universe.length === 500 ? "additional-500" : universe.length === 100 ? "original-100" : "selected-companies";
        downloadFile("india-" + groupName + "-full-history-" + start + "-to-" + end + ".csv", csv);
      }
      const successful = universe.length - failures.length;
      setProgress(universe.length, universe.length, "Finished · " + successful + " / " + universe.length + " companies returned history · " + collected.length.toLocaleString() + " OHLCV rows · successful files contain each stock from its earliest provider bar through " + end + ".");
      if (failures.length) {
        $("indiaFailures").textContent = "No data / request failed for " + failures.length + " symbols: " + failures.slice(0, 16).join(" | ") + (failures.length > 16 ? " | +" + (failures.length - 16) + " more" : "");
      }
    } finally {
      buttons.forEach(function (b) { b.disabled = false; });
    }
  }
  $("indiaDownloadSelected").addEventListener("click", function () {
    runBulkDownload(stocks.filter(function (s) { return selected.has(s.symbol); }));
  });
  $("indiaDownloadAll").addEventListener("click", function () { runBulkDownload(additionalStocks); });
  $("indiaDownloadOriginal").addEventListener("click", function () { runBulkDownload(originalStocks); });
  $("indiaUseOne").addEventListener("click", function () {
    if (selected.size !== 1) {
      $("indiaProgressText").textContent = "Select exactly one company, then use it in the backtest.";
      return;
    }
    const stock = localRowsFor(Array.from(selected)[0])[0];
    $("ticker").value = stock.yahoo;
    $("source").value = "yahoo";
    $("startDate").value = $("bulkStart").value;
    $("endDate").value = $("bulkEnd").value;
    $("interval").value = $("bulkInterval").value;
    document.querySelector('[data-tab="terminal"]').click();
    setTimeout(function () { $("loadData").click(); }, 120);
  });
  renderList();
  document.body.classList.add("india-market");
})().catch(function (error) { console.error("India universe failed to initialise:", error); const status = document.getElementById("dataStatus"); if (status) { status.textContent = "India market universe could not initialise: " + error.message; status.className = "status error"; } });