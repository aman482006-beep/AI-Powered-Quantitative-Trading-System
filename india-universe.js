/* India-only large-cap universe and browser bulk-history downloader for QuantLab. */
(function () {
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
  const stocks = rows.map(function (r) {
    return { symbol: r[0], yahoo: r[0] + ".NS", company: r[1], sector: r[2] };
  });
  const $ = function (id) { return document.getElementById(id); };
  const panel = document.createElement("section");
  panel.id = "indiaUniversePanel";
  panel.className = "panel india-universe";
  panel.innerHTML =
    '<div class="panel-head"><div><span class="eyebrow">INDIA EQUITY UNIVERSE / NIFTY 100</span><h3>100 large-cap Indian companies</h3><p class="india-subcopy">NSE-listed equities only · Yahoo Finance symbols · historical OHLCV in INR</p></div><span class="india-tag">100 NSE STOCKS</span></div>' +
    '<div class="india-toolbar"><div class="india-filter"><label for="indiaSearch">SEARCH COMPANY OR SYMBOL</label><input id="indiaSearch" type="search" placeholder="Search Reliance, INFY, banking…"></div><div class="india-filter"><label for="indiaSector">SECTOR</label><select id="indiaSector"><option value="">All sectors</option></select></div><div class="india-filter india-date"><label for="bulkStart">FROM</label><input id="bulkStart" type="date" value="2020-01-01"></div><div class="india-filter india-date"><label for="bulkEnd">TO</label><input id="bulkEnd" type="date"></div><div class="india-filter"><label for="bulkInterval">FREQUENCY</label><select id="bulkInterval"><option value="1d">Daily</option><option value="1wk">Weekly</option><option value="1mo">Monthly</option></select></div></div>' +
    '<div class="india-selection-row"><div><b id="indiaSelectedCount">100 selected</b><span id="indiaVisibleCount"> · showing 100</span></div><div class="india-selection-actions"><button class="button small ghost" id="indiaSelectVisible">Select visible</button><button class="button small ghost" id="indiaClearSelection">Clear selection</button></div></div>' +
    '<div class="india-stock-grid" id="indiaStockList"></div>' +
    '<div class="india-download-panel"><div class="india-download-copy"><b>Bulk historical data download</b><span>Fetches each selected company’s historical candles and combines them into one Excel-friendly CSV file.</span></div><div class="india-download-actions"><button class="button primary" id="indiaDownloadSelected">↓ Download selected</button><button class="button ghost" id="indiaDownloadAll">↓ Download all 100</button><button class="button ghost" id="indiaUseOne">Use one stock in backtest</button></div></div>' +
    '<div class="india-progress"><div class="india-progress-track"><span id="indiaProgressFill"></span></div><div id="indiaProgressText">Ready · no market data has been downloaded yet.</div></div><div class="india-failures" id="indiaFailures"></div>' +
    '<div class="india-source-note">Universe snapshot: Nifty 100 constituents as at 30 Oct 2026. Historical prices are requested on demand from Yahoo Finance through a public CORS relay; availability, ticker coverage and rate limits are controlled by the provider. This is not an official NSE data feed or a live feed. <a href="https://www.nseindia.com/static/products-services/indices-nifty100-index" target="_blank" rel="noreferrer">NSE index information ↗</a></div>';
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
  const selected = new Set(stocks.map(function (s) { return s.symbol; }));
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function filteredStocks() {
    const q = $("indiaSearch").value.trim().toLowerCase();
    const sector = $("indiaSector").value;
    return stocks.filter(function (s) {
      return (!sector || s.sector === sector) &&
        (!q || (s.symbol + " " + s.company + " " + s.sector).toLowerCase().indexOf(q) >= 0);
    });
  }
  function updateSelectedCount() {
    $("indiaSelectedCount").textContent = selected.size + " selected";
    $("indiaVisibleCount").textContent = " · showing " + filteredStocks().length + " of 100";
  }
  function renderList() {
    const visible = filteredStocks();
    $("indiaStockList").innerHTML = visible.map(function (s) {
      return '<label class="india-stock"><input type="checkbox" class="india-stock-check" value="' + escapeHTML(s.symbol) + '"' + (selected.has(s.symbol) ? " checked" : "") + '><span class="india-stock-main"><b>' + escapeHTML(s.company) + '</b><small>' + escapeHTML(s.symbol) + '.NS</small></span><span class="india-stock-sector">' + escapeHTML(s.sector) + '</span></label>';
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
  tickerHint.textContent = "Search 100 Indian companies by name or NSE symbol";
  tickerWrap.appendChild(tickerHint);
  let activeTickerOption = -1;
  let visibleTickerOptions = [];
  function rankedTickerMatches(query) {
    const q = query.trim().toLowerCase();
    const matches = stocks.filter(function (s) {
      return !q || (s.symbol + " " + s.company + " " + s.sector).toLowerCase().indexOf(q) >= 0;
    });
    matches.sort(function (a,b) {
      if (!q) return a.company.localeCompare(b.company);
      const aRank = a.symbol.toLowerCase() === q ? 0 : a.symbol.toLowerCase().startsWith(q) ? 1 : a.company.toLowerCase().startsWith(q) ? 2 : 3;
      const bRank = b.symbol.toLowerCase() === q ? 0 : b.symbol.toLowerCase().startsWith(q) ? 1 : b.company.toLowerCase().startsWith(q) ? 2 : 3;
      return aRank-bRank || a.company.localeCompare(b.company);
    });
    return matches.slice(0,8);
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
    tickerMenu.innerHTML = visibleTickerOptions.map(function (s,i) {
      return '<button type="button" class="ticker-option" role="option" aria-selected="false" data-index="'+i+'"><span class="ticker-option-name">'+escapeHTML(s.company)+'</span><span class="ticker-option-meta"><b>'+escapeHTML(s.symbol)+'.NS</b><small>'+escapeHTML(s.sector)+'</small></span></button>';
    }).join("") || '<div class="ticker-no-match">No Nifty 100 match. Check the spelling or search by NSE symbol.</div>';
    tickerMenu.hidden = false;
    tickerInput.setAttribute("aria-expanded","true");
    tickerMenu.querySelectorAll(".ticker-option").forEach(function (button) {
      button.addEventListener("mousedown",function (event) { event.preventDefault(); });
      button.addEventListener("click",function () { chooseTicker(visibleTickerOptions[Number(button.dataset.index)]); });
    });
  }
  function setActiveTicker(index) {
    activeTickerOption = Math.max(0,Math.min(index,visibleTickerOptions.length-1));
    tickerMenu.querySelectorAll(".ticker-option").forEach(function (button,i) {
      button.classList.toggle("active",i===activeTickerOption);
      button.setAttribute("aria-selected",i===activeTickerOption?"true":"false");
    });
    const active = tickerMenu.querySelectorAll(".ticker-option")[activeTickerOption];
    if (active) tickerInput.setAttribute("aria-activedescendant",active.id || "");
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
  if (dataHeading) dataHeading.textContent = "Indian equity data only. Browse the Nifty 100 universe, fetch historical OHLCV bars, or upload your own NSE dataset.";
  const navData = document.querySelector('[data-tab="data"] span');
  if (navData) navData.textContent = "India universe";
  const providerCopy = document.querySelector("#page-data .muted-copy");
  if (providerCopy) providerCopy.textContent = "Yahoo Finance chart data for NSE-listed companies (.NS symbols) · historical only · browser CORS relay.";
  const providerRows = document.querySelectorAll("#page-data .provider-row");
  if (providerRows.length > 1) {
    providerRows[0].querySelector("span:first-child").textContent = "Yahoo Finance · NSE symbols";
    providerRows[1].querySelector("span:first-child").textContent = "Nifty 100 universe";
    providerRows[1].querySelector("span:last-child").textContent = "100 INDIAN COMPANIES";
  }

  // Restrict both the fetch button and the backtest shortcut to Indian Nifty 100 symbols.
  function enforceIndianTicker(event) {
    const input = $("ticker");
    const typed = input.value.trim().toUpperCase().replace(/\.NS$/, "");
    const match = stocks.find(function (s) { return s.symbol === typed; });
    if (!match && $("source").value !== "sample") {
      event.stopImmediatePropagation();
      $("dataStatus").textContent = "Choose an Indian Nifty 100 company from the ticker suggestions.";
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
    const url = "https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(stock.yahoo) +
      "?period1=" + p1 + "&period2=" + p2 + "&interval=" + interval + "&events=div%2Csplits";
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch("https://proxy.cors.dev/" + url, { headers: { "Accept": "application/json" } });
        if (!response.ok) throw new Error("provider/relay HTTP " + response.status);
        const payload = await response.json();
        const result = payload.chart && payload.chart.result && payload.chart.result[0];
        if (!result) throw new Error((payload.chart && payload.chart.error && payload.chart.error.description) || "No historical data returned");
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
        if (!output.length) throw new Error("No valid OHLCV rows for this symbol/date range");
        return output;
      } catch (error) {
        lastError = error;
        if (attempt < 2) await sleep(400 * (attempt + 1));
      }
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
    const buttons = [$("indiaDownloadSelected"), $("indiaDownloadAll")];
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
            collected.push([bar.date, stock.symbol, stock.company, stock.sector, bar.open, bar.high, bar.low, bar.close, bar.adjClose, bar.volume]);
          });
        } catch (error) {
          failures.push(stock.symbol + " — " + error.message);
        }
        completed++;
        setProgress(completed, universe.length, "Fetching Indian historical data · " + completed + " / " + universe.length + " companies checked · " + collected.length.toLocaleString() + " rows received");
      }
    }
    try {
      await Promise.all(Array.from({ length: Math.min(4, universe.length) }, worker));
      if (collected.length) {
        collected.sort(function (a, b) { return a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]); });
        const header = ["Date","Symbol","Company","Sector","Open","High","Low","Close","Adj Close","Volume"];
        const csv = [header].concat(collected).map(function (r) { return r.map(csvEscape).join(","); }).join("\r\n");
        downloadFile("india-nifty100-history-" + start + "-to-" + end + ".csv", csv);
      }
      const successful = universe.length - failures.length;
      setProgress(universe.length, universe.length, "Finished · " + successful + " / " + universe.length + " companies returned data · " + collected.length.toLocaleString() + " OHLCV rows downloaded.");
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
  $("indiaDownloadAll").addEventListener("click", function () { runBulkDownload(stocks); });
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
})();