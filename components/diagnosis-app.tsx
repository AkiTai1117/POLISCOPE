"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ANSWER_OPTIONS, QUESTIONS, QUESTIONS_PER_PAGE } from "@/lib/questions";
import { calculateResult } from "@/lib/diagnosis";

type Screen = "home" | "quiz" | "result";

const TOTAL_PAGES = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);

export function DiagnosisApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [error, setError] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const pageQuestions = useMemo(() => {
    const start = page * QUESTIONS_PER_PAGE;
    return QUESTIONS.slice(start, start + QUESTIONS_PER_PAGE);
  }, [page]);

  const answeredOnPage = pageQuestions.filter((question) => answers[question.id] !== undefined).length;
  const totalAnswered = Object.keys(answers).length;
  const result = useMemo(() => calculateResult(QUESTIONS, answers), [answers]);

  useEffect(() => {
    if (screen !== "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      headingRef.current?.focus({ preventScroll: true });
    }
  }, [screen, page]);

  function startDiagnosis() {
    setScreen("quiz");
    setError("");
  }

  function selectAnswer(questionId: number, value: number) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
    setError("");
  }

  function goNext() {
    if (answeredOnPage !== pageQuestions.length) {
      setError(`このページの未回答が${pageQuestions.length - answeredOnPage}問あります。`);
      return;
    }
    if (page < TOTAL_PAGES - 1) {
      setPage((current) => current + 1);
      setError("");
      return;
    }
    setScreen("result");
  }

  function goBack() {
    if (page === 0) {
      setScreen("home");
      return;
    }
    setPage((current) => current - 1);
    setError("");
  }

  function restart() {
    setAnswers({});
    setPage(0);
    setShareStatus("");
    setScreen("home");
  }

  async function shareResult() {
    const signedScore = result.score > 0 ? `+${result.score}` : `${result.score}`;
    const text = `私の政治傾向は「${result.label}」でした（スコア ${signedScore}）。あなたもPOLISCOPEで診断してみませんか？`;
    const shareData = { title: "POLISCOPE 政治傾向診断", text, url: window.location.origin };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("共有メニューを開きました。");
      } else {
        await navigator.clipboard.writeText(`${text}\n${shareData.url}`);
        setShareStatus("結果をクリップボードにコピーしました。");
      }
    } catch (shareError) {
      if (shareError instanceof DOMException && shareError.name === "AbortError") return;
      setShareStatus("共有できませんでした。もう一度お試しください。");
    }
  }

  return (
    <main className="app-shell">
      <header className="site-header">
        <button className="brand" type="button" onClick={restart} aria-label="トップへ戻る">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          POLISCOPE
        </button>
        <div className="header-note"><span aria-hidden="true">?</span> この診断について</div>
      </header>

      {screen === "home" && (
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">POLITICAL TENDENCY CHECK</p>
            <h1 id="hero-title"><span className="nowrap-line">あなたの考えは、</span><br />どこにある？</h1>
            <p className="hero-lead">30の質問から、あなたの政治的な傾向を<br className="desktop-only" />左右のバランスで可視化します。</p>
            <button className="primary-button hero-button" type="button" onClick={startDiagnosis}>
              診断をはじめる <span aria-hidden="true">→</span>
            </button>
            <div className="hero-meta" aria-label="診断の概要">
              <span><b aria-hidden="true">◷</b> 全30問・約3分</span>
              <span><b aria-hidden="true">◇</b> 回答は保存されません</span>
            </div>
          </div>
          <SpectrumArtwork />
        </section>
      )}

      {screen === "quiz" && (
        <section className="quiz-view" aria-labelledby="quiz-title">
          <div className="quiz-topline">
            <div>
              <p className="eyebrow">QUESTIONNAIRE</p>
              <h1 id="quiz-title" ref={headingRef} tabIndex={-1}>あなたの考えを<br />教えてください。</h1>
            </div>
            <div className="page-counter" aria-label={`${TOTAL_PAGES}ページ中${page + 1}ページ`}>
              <strong>{String(page + 1).padStart(2, "0")}</strong><span>/ {String(TOTAL_PAGES).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="progress-track" aria-label={`全体の${Math.round((totalAnswered / QUESTIONS.length) * 100)}%回答済み`}>
            <span style={{ width: `${(totalAnswered / QUESTIONS.length) * 100}%` }} />
          </div>
          <p className="quiz-instruction">最も近いものを、各項目から1つ選んでください。</p>

          <div className="question-list">
            {pageQuestions.map((question) => (
              <fieldset className="question-card" key={question.id}>
                <legend><span>Q{String(question.id).padStart(2, "0")}</span>{question.text}</legend>
                <div className="answer-grid">
                  {ANSWER_OPTIONS.map((option) => (
                    <label className="answer-option" key={option.value}>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.value}
                        checked={answers[question.id] === option.value}
                        onChange={() => selectAnswer(question.id, option.value)}
                      />
                      <span className="radio-dot" aria-hidden="true" />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="quiz-footer">
            <button className="secondary-button" type="button" onClick={goBack}>← 戻る</button>
            <p className="validation-message" role="alert">{error}</p>
            <button className="primary-button" type="button" onClick={goNext}>
              {page === TOTAL_PAGES - 1 ? "結果を見る" : "次の10問へ"} <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      )}

      {screen === "result" && (
        <section className="result-view" aria-labelledby="result-title">
          <div className="result-heading">
            <p className="eyebrow">YOUR RESULT</p>
            <h1 id="result-title" ref={headingRef} tabIndex={-1}>あなたの政治傾向は<br /><em>{result.label}</em>です。</h1>
            <p>{result.description}</p>
          </div>

          <div className="result-card">
            <div className="score-row">
              <span>政治傾き度</span>
              <strong>{result.score > 0 ? "+" : ""}{result.score}<small> / 100</small></strong>
            </div>
            <div className="result-spectrum" role="img" aria-label={`左マイナス100から右プラス100のうち${result.score}`}>
              <div className="result-marker" style={{ left: `${result.position}%` }}><span>{result.score > 0 ? "+" : ""}{result.score}</span></div>
            </div>
            <div className="spectrum-labels"><span>LEFT −100</span><span>中道 0</span><span>RIGHT +100</span></div>
            <p className="result-note">この結果は、30の回答を単純な左右軸に換算したものです。政治的な考え方のすべてを表すものではありません。</p>
          </div>

          <div className="result-actions">
            <button className="primary-button" type="button" onClick={shareResult}>この結果を共有する <span aria-hidden="true">↗</span></button>
            <button className="text-button" type="button" onClick={restart}>もう一度診断する</button>
            <p className="share-status" role="status">{shareStatus}</p>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <p>POLISCOPE</p>
        <p>簡易的な診断コンテンツです。特定の政党・団体とは関係ありません。</p>
      </footer>
    </main>
  );
}

function SpectrumArtwork() {
  return (
    <div className="spectrum-art" aria-label="左から右までの政治傾向を表すイメージ">
      <div className="art-dots dots-top" aria-hidden="true" />
      <div className="art-dots dots-bottom" aria-hidden="true" />
      <div className="art-orb orb-coral" aria-hidden="true" />
      <div className="art-orb orb-blue" aria-hidden="true" />
      <div className="art-content">
        <div className="art-labels"><span>LEFT</span><span>RIGHT</span></div>
        <div className="spectrum-bar"><i /><i /><i /><i /><i /><div className="center-marker" /></div>
        <div className="art-caption"><span>−100</span><span>0</span><span>+100</span></div>
      </div>
    </div>
  );
}
