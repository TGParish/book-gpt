import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [response, setResponse] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [dataFromChatGPT, setDataFromChatGPT] = useState(false);

  function submitForm(e) {
    e.preventDefault();
    sendDataToChatGPT();
    console.log("Ready?");
  }

  function handleOptionChange(e) {
    setSelectedOption(e.target.value);
  }

  function handleResponseChange(e) {
    setResponse(e.target.value);
    console.log(response);
  }

  // function handleResponseChange(e) {
  //   handleResponseChange(e.target.value);
  // }

  // async function sendDataToChatGPT(prompt, promptResponse) {
  //   const responseFromApi = await fetch("/api/test.js", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ prompt, promptResponse }),
  //   });
  //   console.log(responseFromApi.json());
  // }

  async function sendDataToChatGPT() {
    const data = {
      data: `show me ${selectedOption} to ${response} and put them in <li> tags`,
    };

    fetch("/api/newApi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      // .then((data) => {
      //   console.log(data.completion.choices[0].text);
      // })
      .then((data) => {
        setDataFromChatGPT(data.completion.choices[0].text);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <Head>
        <title>Page Oracle</title>
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
            Page Oracle 📗
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
              className="select select-bordered"
              onChange={handleOptionChange}
            >
              <option value="">Pick a prompt...</option>
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
              onClick={() => sendDataToChatGPT("author", "book")}
            >
              {selectedOption == "similiar books"
                ? "Find me books"
                : "Find me authors"}
            </button>{" "}
          </form>
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
