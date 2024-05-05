import React, { useEffect, useState } from 'react'
import ProblemList from '../secondary/DataBodyComp/ProblemList'
import { DataBodyProps, Problem, appProps } from '../PropAbstraction/abstract';
// import { generateProblemData } from '../../insertLocalStorage/generateProblemsData';
import { useSelector, useDispatch } from 'react-redux';
import problemSlice, { fetchProblemFromLocalStorage,updateProblem, selectProblem } from '../../redux/slices/problemSlice';
import { ProblemState } from '../../redux/slices/problemSlice'; 
import { titleMapper } from '../../utils';
import { useNavigate } from 'react-router-dom';


const DataBody = (props : appProps) => {

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeCard, setActiveCard] = useState<keyof ProblemSet>()
  const [activeIndex, setActiveIndex] = useState<any>(null)

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is logged in
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    } else {
      // Redirect to the login page if not logged in
      navigate('/login');
    }
  }, [navigate]);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProblemFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    setSearchTerm(props.searchText)
  },[props.searchText])

  interface ProblemSet {
    draft: Problem[];
    unsolved: Problem[];
    under_review: Problem[];
    solved: Problem[];
  }

  const storedProblem: ProblemSet | undefined = useSelector(selectProblem);
  
  console.log(storedProblem); 
      
    const [draft, setDraft] = useState<Problem[]>([])
    const [unsolve, setUnsolve] = useState<Problem[]>([])
    const [under, setUnder] = useState<Problem[]>([])
    const [solve, setSolve] = useState<Problem[]>([])

    useEffect(() => {
      if (storedProblem) {
        const filteredDraft = storedProblem.draft.filter((problem) =>
          problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (props.filterText
            ? problem.labels.some(
                (label) => label.toLowerCase() === props.filterText.toLowerCase()
              )
            : true)
        );
    
        const filteredUnsolved = storedProblem.unsolved.filter((problem) =>
          problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (props.filterText
            ? problem.labels.some(
                (label) => label.toLowerCase() === props.filterText.toLowerCase()
              )
            : true)
        );
    
        const filteredUnderReview = storedProblem.under_review.filter((problem) =>
          problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (props.filterText
            ? problem.labels.some(
                (label) => label.toLowerCase() === props.filterText.toLowerCase()
              )
            : true)
        );
    
        const filteredSolved = storedProblem.solved.filter((problem) =>
          problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (props.filterText
            ? problem.labels.some(
                (label) => label.toLowerCase() === props.filterText.toLowerCase()
              )
            : true)
        );
    
        if (props.isSort) {
          filteredDraft.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          filteredUnsolved.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          filteredUnderReview.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          filteredSolved.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
    
        setDraft(filteredDraft);
        setUnsolve(filteredUnsolved);
        setUnder(filteredUnderReview);
        setSolve(filteredSolved);
      }
    }, [storedProblem, searchTerm, props.isSort, props.filterText]);

    const onDrop = (categoryTitle: string, index: number) => {
      console.log(`${activeCard} and index ${activeIndex} is going to place into ${categoryTitle} and at the index ${index}`)
      if(activeCard) {
        // dispatch(addProblem({ category: titleMapper[categoryTitle] as keyof ProblemSet, problem: storedProblem[activeCard][activeIndex]}));
        // dispatch(deleteProblem({ category: activeCard as keyof ProblemSet, index: activeIndex }));
        
        dispatch(updateProblem({ categoryFrom: activeCard as keyof ProblemSet, categoryTo: titleMapper[categoryTitle] as keyof ProblemSet,
          problem: storedProblem[activeCard][activeIndex],  index: activeIndex}));
      }
    }



  return (
    <>

    {draft.length>=0 && unsolve.length>=0 && under.length>=0 && solve.length>=0 &&
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-[1280px]'>
        <ProblemList title='Draft' count={draft.length} probData={draft} setActiveCard={setActiveCard} setActiveIndex={setActiveIndex} onDrop={onDrop} />
        <ProblemList title='Unsolved' count={unsolve.length} probData={unsolve} setActiveCard={setActiveCard} setActiveIndex={setActiveIndex} onDrop={onDrop} />
        <ProblemList title='Under Review' count={under.length} probData={under} setActiveCard={setActiveCard} setActiveIndex={setActiveIndex} onDrop={onDrop} />
        <ProblemList title='Solved' count={solve.length} probData={solve} setActiveCard={setActiveCard} setActiveIndex={setActiveIndex} onDrop={onDrop} />
      </div>
    }
    </>
  )
}

export default DataBody;
