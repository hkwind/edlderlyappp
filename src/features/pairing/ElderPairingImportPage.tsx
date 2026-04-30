import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { Link, useSearchParams } from "react-router-dom";
import { useAppStore } from "../../app/store";
import { InfoCard } from "../../components/cards/InfoCard";
import { AppIcon } from "../../components/icons/AppIcon";
import { AppShell } from "../../components/layout/AppShell";
import { PageHeader } from "../../components/layout/PageHeader";
import { copyText } from "../../utils/copyText";
import { decodePairingBundle } from "./pairing";

export function ElderPairingImportPage() {
  const importPairingBundle = useAppStore((state) => state.importPairingBundle);
  const [searchParams] = useSearchParams();
  const [importFeedback, setImportFeedback] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copyFeedback, setCopyFeedback] = useState("");
  const pairCode = searchParams.get("pair");
  const inviteLink = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const url = new URL("/settings/pair-caregiver", window.location.origin);
    url.searchParams.set("invite", "elder");
    return url.toString();
  }, []);

  useEffect(() => {
    if (pairCode) {
      applyPairingCode(pairCode);
    }
  }, [pairCode]);

  useEffect(() => {
    if (!inviteLink) {
      return;
    }

    let cancelled = false;

    QRCode.toDataURL(inviteLink, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 320
    }).then((dataUrl: string) => {
      if (!cancelled) {
        setQrDataUrl(dataUrl);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [inviteLink]);

  function applyPairingCode(code: string) {
    try {
      const bundle = decodePairingBundle(code);
      importPairingBundle(bundle);
      setImportFeedback(`已更新為「${bundle.patient.displayName}」的設定。`);
    } catch (error) {
      setImportFeedback(error instanceof Error ? error.message : "配對失敗。");
    }
  }

  async function handleCopyInviteLink() {
    const copied = await copyText(inviteLink);
    if (copied) {
      setCopyFeedback("已複製長者連接連結。");
    } else {
      setCopyFeedback("自動複製失敗，請長按下面連結手動複製。");
    }
  }

  return (
    <AppShell
      mode="elder"
      title={pairCode ? "匯入照顧者設定" : "顯示連接 QR"}
      subtitle={pairCode ? "正在套用照顧者設定到這部長者手機。" : "讓照顧者掃描這個 QR，或者複製這個連結。"}
    >
      <PageHeader />

      <section className="elder-task-banner" aria-label="pairing guidance">
        <span className="elder-task-banner-icon">
          <AppIcon name="qr" />
        </span>
        <div>
          <p className="elder-task-banner-title">
            {pairCode ? "正在接收照顧者設定" : "先讓照顧者掃描"}
          </p>
          <p className="elder-task-banner-copy">
            {pairCode
              ? "如果設定成功匯入，下面會顯示完成提示。"
              : "照顧者可以掃描這個 QR，或者在照顧者手機輸入下面連結。"}
          </p>
        </div>
      </section>

      {!pairCode ? (
        <>
          <InfoCard title="讓照顧者掃描">
            {qrDataUrl ? <img alt="elder pairing qr code" className="qr-image" src={qrDataUrl} /> : null}
            <p>請用照顧者手機打開設定，掃描這個 QR。</p>
          </InfoCard>

          <InfoCard title="長者連接連結">
            <textarea
              className="pairing-code-area"
              readOnly
              rows={5}
              value={inviteLink}
              onFocus={(event) => event.currentTarget.select()}
            />
            <div className="inline-actions">
              <button className="primary-button" type="button" onClick={handleCopyInviteLink}>
                複製連結
              </button>
              <Link className="secondary-button" to="/settings/pair-caregiver">
                去照顧者連接頁
              </Link>
            </div>
            {copyFeedback ? <p className="form-feedback">{copyFeedback}</p> : null}
          </InfoCard>
        </>
      ) : (
        <InfoCard title="匯入結果">
          <p>{importFeedback || "正在處理設定..."}</p>
          <div className="inline-actions">
            <Link className="primary-button" to="/">
              返回主頁
            </Link>
            <Link className="secondary-button" to="/settings">
              返回設定
            </Link>
          </div>
        </InfoCard>
      )}
    </AppShell>
  );
}
