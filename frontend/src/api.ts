export const baseUrl = "http://localhost:4242";

export interface Deck {
  images: Array<{
    src: string;
    thumbnailSrc: string;
  }>;
}

export const Api = {
  getDeck: () => fetch(baseUrl + "/deck").then((it) => it.json()),
  upload: (file: File) => {
    const form = new FormData();
    form.append("file", file);

    return fetch(baseUrl + "/upload", {
      method: "POST",
      body: form,
    }).then((it) => it.blob());
  },
};
