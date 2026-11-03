from __future__ import annotations
import os
import pandas as pd
import streamlit as st
import plotly.graph_objects as go
from dotenv import load_dotenv
from quantlab.data import fetch_yahoo, load_csv
from quantlab.engine import backtest
from quantlab.analytics import performance

load_dotenv()
st.set_page_config(page_title="QuantLab Research Terminal",page_icon="◈",layout="wide")
st.title("◈ QuantLab · Quantitative Research Terminal")
st.caption("Historical research and simulation only · No live data or order execution")
with st.sidebar:
    st.header("Market & strategy")
    ticker=st.text_input("Ticker","RELIANCE.NS")
    source=st.radio("Data source",["Yahoo Finance","CSV upload"])
    start=st.date_input("Start",pd.Timestamp("2020-01-01")); end=st.date_input("End",pd.Timestamp.today())
    interval=st.selectbox("Frequency",["1d","1wk","1mo"])
    upload=st.file_uploader("OHLCV CSV",type=["csv"]) if source=="CSV upload" else None
    strategy=st.selectbox("Strategy",["sma","ema","rsi","macd","bb","momentum"])
    defaults={"sma":{"fast":20,"slow":50},"ema":{"fast":12,"slow":26},"rsi":{"period":14,"oversold":30,"overbought":70},"macd":{"fast":12,"slow":26,"signal":9},"bb":{"period":20,"std":2.0},"momentum":{"period":20}}
    params={}
    for k,v in defaults[strategy].items(): params[k]=st.number_input(k,min_value=1 if isinstance(v,int) else .5,value=v,step=1 if isinstance(v,int) else .5)
    capital=st.number_input("Initial capital",min_value=1000.,value=100000.)
    size=st.slider("Position size",.05,1.,.95)
    commission=st.number_input("Commission fraction",0.,.05,.001,format="%.4f")
    slippage=st.number_input("Slippage fraction",0.,.05,.0005,format="%.4f")
    stop=st.number_input("Stop loss fraction",0.,.95,0.,format="%.3f")
    target=st.number_input("Take profit fraction",0.,5.,0.,format="%.3f")
    run=st.button("Run backtest",type="primary",use_container_width=True)

if "data" not in st.session_state: st.session_state.data=None
if run:
    try:
        d=load_csv(upload) if source=="CSV upload" and upload else fetch_yahoo(ticker,str(start),str(end),interval)
        st.session_state.data=d; st.session_state.source="CSV upload" if upload else "Yahoo Finance historical"
        result=backtest(d,strategy,params,capital,size,commission,slippage,stop,target)
        freq={"1d":252,"1wk":52,"1mo":12}[interval]; metrics=performance(result,freq)
        st.session_state.result=result; st.session_state.metrics=metrics
    except Exception as exc: st.error(str(exc))

d=st.session_state.data; result=st.session_state.get("result")
if d is not None:
    st.info(f"Source: {st.session_state.source} · {len(d):,} rows · {d.index.min().date()} to {d.index.max().date()}")
    st.subheader("Market data")
    st.line_chart(d[["Close"]])
if result is not None:
    m=st.session_state.metrics
    cols=st.columns(6)
    for col,(label,key,scale) in zip(cols,[("Total return","total_return",100),("CAGR","cagr",100),("Sharpe","sharpe",1),("Sortino","sortino",1),("Max drawdown","max_drawdown",100),("Win rate","win_rate",100)]): col.metric(label,f"{m[key]*scale:.2f}"+("%" if scale==100 else ""))
    fig=go.Figure(); fig.add_trace(go.Scatter(x=result["equity"].index,y=result["equity"].Equity,name="Strategy equity")); fig.update_layout(title="Portfolio equity",template="plotly_dark"); st.plotly_chart(fig,use_container_width=True)
    st.plotly_chart(go.Figure(go.Scatter(x=result["equity"].index,y=result["equity"].Drawdown,fill="tozeroy",name="Drawdown")).update_layout(template="plotly_dark",title="Drawdown"),use_container_width=True)
    st.subheader("Trade history"); st.dataframe(result["trades"],use_container_width=True)
    st.download_button("Download trades CSV",result["trades"].to_csv(index=False),"trades.csv","text/csv")
    st.subheader("Research assistant")
    question=st.text_input("Ask about this backtest")
    if st.button("Generate explanation") and question:
        api=os.getenv("GEMINI_API_KEY")
        if api:
            try:
                import google.generativeai as genai
                genai.configure(api_key=api); model=genai.GenerativeModel(os.getenv("GEMINI_MODEL","gemini-1.5-flash"))
                prompt=f"Use only these actual measured metrics. Do not invent figures. Explain limits and that historical returns do not predict future performance. Metrics: {m}. Question: {question}"
                st.write(model.generate_content(prompt).text)
            except Exception as exc: st.warning(f"LLM unavailable: {exc}. Showing deterministic summary."); st.json(m)
        else: st.info(f"Measured metrics: {m}. Configure GEMINI_API_KEY on the server for generative commentary. These historical results do not forecast future performance.")
else: st.info("Load historical data and run a simulation. Start with RELIANCE.NS or upload your own OHLCV CSV.")
