interface ImportMeta {
  readonly webpackHot?: {
    accept: (path?: string, callback?: () => void) => void;
  };
}
