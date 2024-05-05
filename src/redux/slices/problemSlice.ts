import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Problem } from '../../component/PropAbstraction/abstract';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


export interface ProblemState {
  draft: Problem[];
  unsolved: Problem[];
  under_review: Problem[];
  solved: Problem[];
}

const initialState: ProblemState = {
  draft: [],
  unsolved: [],
  under_review: [],
  solved: [],
};


interface ProblemSet {
  [key: string]: Problem[];
}

const localStorageData: ProblemSet | null = JSON.parse(localStorage.getItem('problem') || 'null');

console.log(localStorageData)

export const problemSlice = createSlice({
  name: 'problem',
  initialState,
  reducers: {
    fetchProblemFromLocalStorage: (state) => {
      // Fetch the problem data from local storage and update the state
      if (localStorageData) {
        state.draft = localStorageData.draft;
        state.unsolved = localStorageData.unsolved;
        state.under_review = localStorageData.under_review;
        state['solved'] = localStorageData.solved;
      }
    },
    addProblem: (state, action: PayloadAction<{ category: keyof ProblemState, problem: Problem }>) => {
        const { category, problem } = action.payload;
        // Assert the type of state[category] to Problem[] using type assertion (as)
        
        console.log(localStorageData)

        if(localStorageData === null) {
          const newProblemSet : ProblemSet = {
            draft : [],
            unsolved: [],
            under_review: [],
            solved: []
          }
          newProblemSet[category].push(problem)
          localStorage.setItem('problem', JSON.stringify(newProblemSet));
        }else{
          const updatedData = {
            ...localStorageData, // Create a new object by spreading the old state
            [category]: [...(localStorageData[category] || []), problem], // Add the problem to the appropriate category array
          };
          console.log(updatedData)
          localStorage.removeItem('problem');
          localStorage.setItem('problem', JSON.stringify(updatedData));
        }
        
      },

      editProblem: (state, action: PayloadAction<{ category: keyof ProblemState, index: number, problem: Problem }>) => {
        const { category, index, problem } = action.payload;
        // Assert the type of state[category] to Problem[] using type assertion (as)
        
        console.log(localStorageData)

        if (localStorageData === null) {
          console.log("no data")
        } else {
          const updatedData = {
            ...localStorageData,
            [category]: localStorageData[category].map((item, i) =>
              i === index ? problem : item
            )
          };
          console.log(updatedData[category][index]);
      
          localStorage.removeItem('problem');
          localStorage.setItem('problem', JSON.stringify(updatedData));
        }
        
      },
      
    deleteProblem : (state, action: PayloadAction<{ category: keyof ProblemState, index : number }>) => {
      const { category, index } = action.payload
      console.log(category, index);

      
      if(localStorageData === null) {
        console.log("no data")
      }else{
        const updatedData = {
          ...localStorageData, // Create a new object by spreading the old state
          [category] : localStorageData[category].filter((_, i) => i !== index)
        }; 
        console.log(updatedData[category][index])

        localStorage.removeItem('problem');
        localStorage.setItem('problem', JSON.stringify(updatedData));
      }
    },

    
    updateProblem : (state, action: PayloadAction<{ categoryFrom: keyof ProblemState, categoryTo: keyof ProblemState, problem: Problem, index : number }>) => {
        
      const {categoryFrom , categoryTo, problem, index} = action.payload

      console.log(categoryFrom,categoryTo,problem,index)

      // const data = dispatch(addProblem({ category: categoryTo as keyof ProblemState, problem: problem }));

      console.log(categoryFrom , categoryTo, problem, index)

      if(localStorageData === null) {
        console.log("no data")
      }else{
        const updatedData = {
          ...localStorageData, // Create a new object by spreading the old state
          [categoryTo]: [...(localStorageData[categoryTo] || []), problem], // Add the problem to the appropriate category array
        };
        console.log(updatedData)
        localStorage.removeItem('problem');
        localStorage.setItem('problem', JSON.stringify(updatedData));

        
      }

      const lsData2 = JSON.parse(localStorage.getItem('problem') || '{}');

      console.log("ddfsdfddfdsfdf",lsData2[categoryFrom])
      console.log("ddfsdfddfdsfdf",categoryFrom)

      if(lsData2 === null) {
        console.log("no data")
      }else{
        const updatedData2 = {
          ...lsData2, // Create a new object by spreading the old state
          [categoryFrom] : lsData2[categoryFrom].filter((_ : number, i: number) => i !== index)
        }; 
        console.log(updatedData2[categoryFrom][index])

        localStorage.removeItem('problem');
        localStorage.setItem('problem', JSON.stringify(updatedData2));
      }
  }
}})


export const { fetchProblemFromLocalStorage, addProblem,  deleteProblem, updateProblem } = problemSlice.actions;

export const selectProblem = (state: RootState) => state.problem;


export default problemSlice.reducer;