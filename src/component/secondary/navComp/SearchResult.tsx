import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProblem, fetchProblemFromLocalStorage } from '../../../redux/slices/problemSlice';
import { Problem } from '../../PropAbstraction/abstract';
import { searchProps } from '../../PropAbstraction/abstract';

const SearchResult = (props  : searchProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProblemFromLocalStorage());
  }, [dispatch]);

  
  const storedProblem = useSelector(selectProblem);

  const allTitles = [
    ...storedProblem.draft?.map((problem: Problem) => problem.title) || [],
    ...storedProblem.unsolved?.map((problem: Problem) => problem.title) || [],
    ...storedProblem.under_review?.map((problem: Problem) => problem.title) || [],
    ...storedProblem.solved?.map((problem: Problem) => problem.title) || [],
  ];

  console.log(allTitles);

  return (
    <div>
      {allTitles.map((title, index) => (
        <div key={index}>{title}</div>
      ))}
    </div>
  );
};

export default SearchResult;
