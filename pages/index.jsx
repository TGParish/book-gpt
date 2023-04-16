import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(false);
  const [response, setResponse] = useState("");
  const [dataFromChatGPT, setDataFromChatGPT] = useState(false);
  const [error, setError] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  function submitForm(e) {
    setDisabledButton(true);
    e.preventDefault();
    console.log("Ready?");
    sendDataToChatGPT();
  }

  function handleOptionChange(e) {
    setSelectedOption(e.target.value);
  }

  function handleResponseChange(e) {
    if (response === "") {
      setError("Please pick a prompt and type a response");
    }
    setError(false);
    setDisabledButton(false);
    setResponse(e.target.value);
  }

  async function sendDataToChatGPT() {
    if (response === "") {
      setError("Please pick a prompt and type a response");
      return;
    } else {
      setError(false);
    }

    const data = {
      data: `show me a numbered list of 5 ${selectedOption} to ${response} and end them with </br> tags`,
    };

    fetch("/api/chatGpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setDataFromChatGPT(data.completion.choices[0].text);
      })
      .then(setDisabledButton(false))
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <Head>
        <title>Book GPT</title>
        <meta
          name="description"
          content="Get book recommendations, powered by ai."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header className="flex flex-col gap-2 mt-2">
          <h1 className="text-center text-4xl text-primary font-bold font-merriweather">
            Book GPT 📗
          </h1>
          <p className="text-xl text-center">
            Find book recommendations with the power of AI
          </p>
        </header>
        <section
          id="prompt"
          className="flex flex-col justify-center items-center"
        >
          <form
            id="prompt-form"
            onSubmit={submitForm}
            className="flex flex-col gap-2 w-full lg:w-[40rem] p-4"
          >
            <h2 className="text-2xl text-center">
              Select your prompt below and type in your response
            </h2>
            <label htmlFor="selection"></label>
            <select
              name="select-option"
              id="select"
              tite="select-option"
              className={
                error ? "select select-bordered" : "select select-bordered"
              }
              onChange={handleOptionChange}
            >
              <option>Pick a prompt...</option>
              <option value="similiar books">Books similiar to...</option>
              <option value="similiar authors">Authors similiar to...</option>
            </select>
            {selectedOption == "similiar books" ? (
              <>
                <label htmlFor="response" hidden></label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="input input-primary"
                  placeholder="The Great Gatsby, The 48 Laws of Power etc..."
                  onChange={handleResponseChange}
                />
              </>
            ) : null}
            {selectedOption == "similiar authors" ? (
              <input
                type="text"
                name=""
                id=""
                className="input input-primary"
                placeholder="Robert Greene, Ryan Holiday etc..."
                onChange={handleResponseChange}
              />
            ) : null}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={disabledButton}
              onClick={() => sendDataToChatGPT("author", "book")}
            >
              {selectedOption == "similiar books"
                ? "Find me books"
                : "Find me authors"}
            </button>{" "}
          </form>
          <section>
            {error ? (
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            ) : null}
          </section>
          {dataFromChatGPT ? (
            <section>
              <div
                id="dataList"
                dangerouslySetInnerHTML={{ __html: dataFromChatGPT }}
              ></div>
            </section>
          ) : null}
        </section>
      </main>
    </>
  );
}
