export default function Loading() {
  return (
    <div className="page-shell flex min-h-[55vh] items-center justify-center">
      <div className="redcore-loader" role="status" aria-live="polite">
        <span className="redcore-loader-mark" aria-hidden="true">
          <span className="redcore-loader-core">R</span>
          <span className="redcore-loader-orbit orbit-one" />
          <span className="redcore-loader-orbit orbit-two" />
        </span>
        <span className="redcore-loader-copy">Carregando RedCore…</span>
      </div>
    </div>
  );
}
