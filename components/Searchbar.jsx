import React, { useState, useEffect } from "react";
import Link from "next/link"
import styles from "../styles/Searchbar.module.scss";

import questions from "../public/data/questions.json"

import { AiOutlineSearch } from "react-icons/ai";

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { useDetectClickOutside } from 'react-detect-click-outside';

function Searchbar() {

  const ref = useDetectClickOutside({ onTriggered: () => setShowAutoComplete(false) });

  const [autoComplete, setAutoComplete] = useState([]);
  const [showAutoComplete, setShowAutoComplete] = useState(false);

  const [allQuestions, setAllQuestions] = useState(null);

  const handleSearch = (search) => {

    if(!search || !allQuestions || search.length < 5) {
      setAutoComplete([]);
      return;
    }

    const exactMatch = allQuestions.find(s => s.toLowerCase() == search.toLowerCase()),
          partialMatches = allQuestions.filter(s => s.toLowerCase().includes(search.toLowerCase())),
          vagueMatches = allQuestions.filter(s => 
             search
              .toLowerCase()
              .split(' ')
              .every(w => s.toLowerCase().includes(w))
          )
    let allMatches = [...new Set([exactMatch, ...partialMatches, ...vagueMatches])];  

    allMatches = allMatches.filter(match => match !== undefined);

    setAutoComplete(allMatches);
  }

  console.log(autoComplete)

  useEffect(() => {
    let allQ = [];

    questions.forEach(category => {
      category.questions.map(q => allQ.push(q.title));
    });

    setAllQuestions(allQ)
  }, [])
  

  return (
    <section className={styles.searchbar} ref={ref}>
      <input placeholder={"Ask a question..."} onChange={(e) => handleSearch(e.target.value)} onFocus={() => setShowAutoComplete(true)} />
      <button>
        <AiOutlineSearch />
      </button>

      {
        autoComplete.length > 0 && showAutoComplete &&       

        <section className={styles.autoComplete}>
          <SimpleBar style={{ maxHeight: "19rem"}}>
          {
            autoComplete.map((question, i) => {

              let index = allQuestions.indexOf(question);

              return <Link key={i} href={`/faq/search?q=${index}`}><p>{question}</p></Link>
            })
          }
          </SimpleBar>
      </section>

      }

    </section>
  );
}

export default Searchbar;
