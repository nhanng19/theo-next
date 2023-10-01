"use server";

import jsdom from "jsdom";
const { JSDOM } = jsdom;
import { formatBibleReference } from "../utils";
const options = {
  headers: new Headers({
    Authorization: `Token ac15b91af25c93deb7ed7da48a1d8f49c23141b5`,
  }),
};

export const getVerse = async (userInput: string) => {
  try {
    const response = await fetch(
      `https://api.esv.org/v3/passage/html/?q=${userInput}&include-surrounding-chapters=true&include-surrounding-chapters-below=false`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCommentary = async (query = "") => {
  try {
    const parsed = formatBibleReference(query).split(".")
    const url = `https://www.bibleref.com/${parsed[0]}/${parsed[1]}/${parsed[0]}-${parsed[1]}-${parsed[2]}.html`;
    console.log(url)
    const response: any = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const data = dom.window.document.querySelector(".leftcomment");
    const explanation = data ? data.outerHTML : "";
    return explanation;
  } catch (error: any) {
    return ""
}
};
