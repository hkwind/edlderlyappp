import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { Link, useSearchParams } from "react-router-dom";
import { useAppStore } from "../../app/store";
import { InfoCard } from "../../components/cards/InfoCard";
import { AppIcon } from "../../components/icons/AppIcon";
import { AppShell } from "../../components/layout/AppShell";
import { copyText } from "../../utils/copyText";
import { encodePairingBundle, type PairingBundle } from "./pairing";

export function CaregiverPairingPage() {
  const [searchParams] = useSearchParams();
  const patient = useAppStore((state) => state.patient);
  const contacts = useAppStore((state) => state.contacts);
  const destinations = useAppStore((state) => state.destinations);
  const reminders = useAppStore((state) => state.reminders);
  const customSlots = useAppStore((state) => state.customSlots);
  const locationStatus = useAppStore((state) => state.locationStatus);
  const deviceStatus = useAppStore((state) => state.deviceStatus);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const detectorRef = useRef<BarcodeDetector | null>(null);
  const frameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copyFeedback, setCopyFeedback] = useState("");
  const [linkFeedback, setLinkFeedback] = useState("");
  const [manualInviteLink, setManualInviteLink] = useState("");
  const [inviteAccepted, setInviteAccepted] = useState(searchParams.get("invite") === "elder");
  const [inviteFeedback, setInviteFeedback] = useState(
    searchParams.get("invite") === "elder" ? "已收到長者連接邀請。" : "未連接長者手機。"
  );
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState("未開始掃描。");

  const pairingCode = useMemo(() => {
    const bundle: PairingBundle = {
      version: 1,
      patient,
      contacts,
      destinations,
      reminders,
      customSlots,
      locationStatus,
      deviceStatus
    };

    return encodePairingBundle(bundle);
  }, [
    contacts,
    customSlots,
    destinations,
    deviceStatus,
    locationStatus,
    patient,
    reminders
  ]);

  const importLink = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const url = new URL("/settings/pair-elder", window.location.origin);
    url.searchParams.set("pair", pairingCode);
    return url.toString();
  }, [pairingCode]);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  useEffect(() => {
    if (!inviteAccepted) {
      setQrDataUrl("");
      return;
    }

    let cancelled = false;

    QRCode.toDataURL(importLink, {
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
  }, [importLink, inviteAccepted]);

  function acceptInvite(link: string) {
    try {
      const url = new URL(link);
      const isValidPath =
        url.pathname === "/settings/pair-caregiver" || url.pathname === "/caregiver/pairing";

      if (!isValidPath || url.searchParams.get("invite") !== "elder") {
        throw new Error();
      }

      setManualInviteLink(link);
      setInviteAccepted(true);
      setInviteFeedback("已收到長者連接邀請，可以產生更新連結。");
    } catch {
      setInviteAccepted(false);
      setInviteFeedback("這個長者連結格式不正確。");
    }
  }

  async function startScanner() {
    if (!("BarcodeDetector" in window)) {
      setScanStatus("這部手機未支援瀏覽器 QR 掃描，請改用貼上長者連結。");
      return;
    }

    try {
      detectorRef.current = new BarcodeDetector({ formats: ["qr_code"] });
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment"
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
        await videoRef.current.play();
      }

      setIsScanning(true);
      setScanStatus("請對準長者手機顯示的 QR。");
      frameRef.current = window.requestAnimationFrame(scanLoop);
    } catch {
      setScanStatus("無法開啟相機，請改用貼上長者連結。");
    }
  }

  function stopScanner() {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsScanning(false);
  }

  async function scanLoop() {
    if (!detectorRef.current || !videoRef.current) {
      return;
    }

    try {
      const barcodes = await detectorRef.current.detect(videoRef.current);
      const rawValue = barcodes[0]?.rawValue;

      if (rawValue) {
        acceptInvite(rawValue);
        setScanStatus("已掃描長者連結。");
        stopScanner();
        return;
      }
    } catch {
      setScanStatus("掃描時出現問題，請改用貼上長者連結。");
      stopScanner();
      return;
    }

    frameRef.current = window.requestAnimationFrame(scanLoop);
  }

  async function handleCopyCode() {
    const copied = await copyText(pairingCode);
    if (copied) {
      setCopyFeedback("已複製配對碼。");
    } else {
      setCopyFeedback("自動複製失敗，請長按下面文字手動複製。");
    }
  }

  async function handleCopyLink() {
    const copied = await copyText(importLink);
    if (copied) {
      setLinkFeedback("已複製分享連結。");
    } else {
      setLinkFeedback("自動複製失敗，請長按下面連結手動複製。");
    }
  }

  async function handleShareLink() {
    if (!navigator.share) {
      setLinkFeedback("這部手機未支援直接分享，請改用複製連結。");
      return;
    }

    try {
      await navigator.share({
        title: "腦友所依 配對連結",
        text: "打開這個連結，在長者手機匯入照顧者設定。",
        url: importLink
      });
      setLinkFeedback("已打開分享。");
    } catch {
      setLinkFeedback("未完成分享，請再試一次或直接複製連結。");
    }
  }

  return (
    <AppShell
      mode="caregiver"
      title="照顧者連接長者手機"
      subtitle="先掃描長者顯示的 QR 或輸入長者連結，再產生更新連結。"
      actions={
        <Link className="secondary-button" to="/settings">
          返回設定
        </Link>
      }
    >
      <section className="elder-task-banner" aria-label="pairing explanation">
        <span className="elder-task-banner-icon">
          <AppIcon name="qr" />
        </span>
        <div>
          <p className="elder-task-banner-title">照顧者先接收長者邀請</p>
          <p className="elder-task-banner-copy">建議先掃描長者顯示的 QR。如果手機掃描不穩定，就貼上長者連結。</p>
        </div>
      </section>

      <InfoCard title="第一步：掃描長者 QR">
        <video className="pairing-video" muted playsInline ref={videoRef} />
        <p>{scanStatus}</p>
        <div className="inline-actions">
          {!isScanning ? (
            <button className="primary-button" type="button" onClick={startScanner}>
              開始掃描
            </button>
          ) : (
            <button className="secondary-button" type="button" onClick={stopScanner}>
              停止掃描
            </button>
          )}
        </div>
      </InfoCard>

      <InfoCard title="或者輸入長者連結">
        <textarea
          className="pairing-code-area"
          placeholder="如果掃描唔到，可以喺呢度貼上長者手機顯示的連結。"
          rows={5}
          value={manualInviteLink}
          onChange={(event) => setManualInviteLink(event.target.value)}
        />
        <div className="inline-actions">
          <button className="primary-button" type="button" onClick={() => acceptInvite(manualInviteLink)}>
            確認長者連結
          </button>
        </div>
        <p className="form-feedback">{inviteFeedback}</p>
      </InfoCard>

      {inviteAccepted ? (
        <>
          <InfoCard title="第二步：把更新連結送回長者手機">
            <textarea
              className="pairing-code-area"
              readOnly
              rows={5}
              value={importLink}
              onFocus={(event) => event.currentTarget.select()}
            />
            <div className="inline-actions">
              <button className="primary-button" type="button" onClick={handleCopyLink}>
                複製更新連結
              </button>
              <button className="secondary-button" type="button" onClick={handleShareLink}>
                直接分享
              </button>
            </div>
            {linkFeedback ? <p className="form-feedback">{linkFeedback}</p> : null}
          </InfoCard>

          <InfoCard title="更新 QR 備用">
            {qrDataUrl ? <img alt="caregiver update qr code" className="qr-image" src={qrDataUrl} /> : null}
            <p>如果長者手機方便再掃一次，也可以用這個 QR 匯入最新設定。</p>
          </InfoCard>

          <InfoCard title="更新碼備用">
            <textarea
              className="pairing-code-area"
              readOnly
              rows={6}
              value={pairingCode}
              onFocus={(event) => event.currentTarget.select()}
            />
            <div className="inline-actions">
              <button className="primary-button" type="button" onClick={handleCopyCode}>
                複製更新碼
              </button>
            </div>
            {copyFeedback ? <p className="form-feedback">{copyFeedback}</p> : null}
          </InfoCard>
        </>
      ) : null}

      <InfoCard title="會同步的內容">
        <div className="stack-list">
          <div className="list-link-card">
            <strong>長者資料與聯絡人</strong>
            <span>{patient.displayName}｜{contacts.length} 位家人聯絡資料</span>
          </div>
          <div className="list-link-card">
            <strong>地點與藥單</strong>
            <span>{destinations.length} 個地點｜{reminders.length} 項藥單</span>
          </div>
          <div className="list-link-card">
            <strong>自訂格與狀態</strong>
            <span>{customSlots.length} 個快捷格｜位置與電量 mock 狀態</span>
          </div>
        </div>
      </InfoCard>
    </AppShell>
  );
}
