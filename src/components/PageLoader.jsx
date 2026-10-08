export default function PageLoader() {
  return (
    <div style={{ minHeight: "55vh", display: "grid", placeItems: "center", padding: 48, background: "#F8F7F5" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 42, height: 42, borderRadius: "50%", border: "4px solid #F2D7DC", borderTopColor: "#D50F35", animation: "waia-spin .8s linear infinite", margin: "0 auto 14px" }} />
        <strong style={{ color: "#212121" }}>Cargando WAIA…</strong>
      </div>
      <style>{`@keyframes waia-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
