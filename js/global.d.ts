declare global {
  interface Window {
    clipboardData?: DataTransfer;
    Set?: Set<any>;
    hljs?: {
      initHighlightingOnLoad: CallableFunction
    };
  }
  interface Element {
    currentStyle: Record<string, string>;
  }
}

export { }