declare global {
  interface Window {
    clipboardData?: DataTransfer;
    Set?: Set<T>;
  }
}

export { }