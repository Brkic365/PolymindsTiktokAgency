import React, { useState, useEffect } from "react";
import Link from "next/link"
import styles from "../styles/Searchbar.module.scss";

import { useRouter } from "next/router"

import questions from "../public/data/questions.json"

import { AiOutlineSearch } from "react-icons/ai";

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { useDetectClickOutside } from 'react-detect-click-outside';

function Searchbar() {
  const router = useRouter();

  const ref = useDetectClickOutside({ onTriggered: () => setShowAutoComplete(false) });

  const [autoComplete, setAutoComplete] = useState([]);
  const [showAutoComplete, setShowAutoComplete] = useState(false);

  const [searchVal, setSearchVal] = useState(null);

  const [allQuestions, setAllQuestions] = useState(null);

  const handleSearch = (search) => {

    console.log(search);

    setSearchVal(search);

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

  const handleForceSearch = () => {
    if(autoComplete.length > 0) {
      let index = allQuestions.indexOf(autoComplete[0]);

      router.push(`/faq/search?q=${index}`);
      setShowAutoComplete(false);
    } else {
      router.push(`/faq/search?q=${searchVal}`);
    }
  }

  // Handle key press
  const handleKeyDown = (e) => {

    // If user pressed enter on search, search the value of input
    if (e.key === 'Enter') {
      handleForceSearch();
    }
  }

  useEffect(() => {
    let allQ = [];

    questions.forEach(category => {
      category.questions.map(q => allQ.push(q.title));
    });

    setAllQuestions(allQ)
  }, [])
  

  return (
    <section className={styles.searchbar} ref={ref}>
      <input placeholder={"Ask a question..."} onKeyDown={handleKeyDown} onChange={(e) => handleSearch(e.target.value)} onFocus={() => setShowAutoComplete(true)} />
      <button onClick={handleForceSearch}>
        <AiOutlineSearch />
      </button>

      {
        autoComplete.length > 0 && showAutoComplete &&       

        <section className={styles.autoComplete}>
          <SimpleBar style={{ maxHeight: "19rem"}}>
          {
            autoComplete.map((question, i) => {

              let index = allQuestions.indexOf(question);

              return <Link key={i} href={`/faq/search?q=${index}`} onClick={() => setShowAutoComplete(false)}><p>{question}</p></Link>
            })
          }
          </SimpleBar>
      </section>

      }

    </section>
  );
}

export default Searchbar;
