// Type for a single problem item
export interface Problem {
    title: string;
    createdAt: string;
    labels: string[];
  }
  
  // Type for array of problems
  export type ProblemArray = Problem[];
  
  // Type for props of ProblemList component
  export type DataBodyProps = {
    title: string;
    count: number;
    probData: ProblemArray; // Optional property for draft data
    setActiveCard: any;
    setActiveIndex: any;
    onDrop: (categoryTitle: string, index: number) => void;
  };
  

  export type ProblemListProps = {
    eachProb : Problem;
    index : number;
    categoryTitle : string;
    setActiveCard : any;
    setActiveIndex: any;
  }

  export type addModalProps = {
    onClose: () => void;
    title : string;
  }

  export type DropAreaProps = {
    onDrop: (categoryTitle: string, index: number) => void;
    categoryTitle : string;
    index : number;
  }

  export type searchProps = {
    setSearchText : any;
  }

  export type navProps = {
    setSearchText : any;
    setIsSort:any;
    setFilterText : any;
  }

  export type appProps = {
    searchText : string;
    isSort:boolean;
    filterText : string;
  }

  export type sortProps = {
    setIsSort:any;
  }

  export type filterProps = {
    setFilterText:any;
  }