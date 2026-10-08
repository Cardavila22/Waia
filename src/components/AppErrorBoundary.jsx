import React from "react";

export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("WAIA runtime error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const message = this.state.error?.message || "Error desconocido al cargar WAIA.";

    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: 24,
          background: "#F8F7F5",
          color: "#212121",
          fontFamily: 'Poppins, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <section
          style={{
            width: "min(100%, 720px)",
            background: "#fff",
            border: "1px solid #E7E5E4",
            borderRadius: 24,
            padding: 28,
            boxShadow: "0 20px 60px rgba(33,33,33,.10)",
          }}
        >
          <div style={{ color: "#D50F35", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", fontSize: 12 }}>
            WAIA · Modo local
          </div>
          <h1 style={{ margin: "10px 0 8px", fontSize: "clamp(28px, 5vw, 42px)", letterSpacing: "-.04em" }}>
            No se pudo cargar la interfaz
          </h1>
          <p style={{ margin: "0 0 18px", color: "#667085", lineHeight: 1.7 }}>
            El servidor está funcionando, pero una parte de la aplicación produjo un error de JavaScript.
          </p>
          <pre
            style={{
              margin: 0,
              padding: 14,
              borderRadius: 14,
              background: "#F8F7F5",
              color: "#7A1A2B",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: 13,
            }}
          >
            {message}
          </pre>
          <button
            type="button"
            onClick={this.handleReload}
            style={{
              marginTop: 18,
              border: 0,
              borderRadius: 13,
              padding: "12px 18px",
              background: "#D50F35",
              color: "#fff",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Recargar WAIA
          </button>
        </section>
      </main>
    );
  }
}
