class DCodingProblems {

    constructor() {}

    /* multi-set problem
    Given a multiset of integers, return whether it can be partitioned 
    into two subsets whose sums are the same. For example, given the 
    multiset {15, 5, 20, 10, 35, 15, 10}, it would return true, since 
    we can split it up into {15, 5, 10, 15, 10} and {20, 35}, which 
    both add up to 55. Given the multiset {15, 5, 20, 10, 35}, it would 
    return false, since we can't split it up into two subsets that add 
    up to the same sum.
     */
    sixty(arr: number[]): boolean {
        if(arr == null) {
            return false;
        }
        //step 1: check if the sum is odd?
        const reducer = (v1: number, v2: number) => v1 + v2;
        let total = arr.reduce(reducer);
        if(total % 2 != 0) {
            //if so then it's impossible to find 2 'equal' partitions
            return false;
        }
        var returnVal = true;
        let half = total / 2;
        //get half and then find 2 subsets that total upto that no
        return this.hasSubset(arr, arr.length, total / 2);
    }
    private hasSubset(arr: number[], idx: number, sum: number): boolean {
        if(sum == 0) {
            return true;
        } else if(idx == 0 && sum != 0) {
            return false;
        }
        if(arr[idx - 1] > sum) {
            return this.hasSubset(arr, idx - 1, sum);
        } 
        return this.hasSubset(arr, idx - 1, sum)
        || this.hasSubset(arr, idx -1 , sum - arr[idx -1] );
    }
    oneSixtyTwo(words: string[]) {

    }
    oneSixty(){
        class Pair<T, V> {
            first: T;
            second: V;
            constructor(first: T, second: V) {
                this.first = first;
                this.second = second;
            }
        }
        class Tree {
            totalVertices: number;
            adjList: number[][];
            constructor(v: number, adjList?: number[]) {
                this.totalVertices = v;
                this.adjList = new Array<number[]>();
                for(let i=0; i < this.totalVertices; i++) {
                    this.adjList[i] = new Array<number>();
                }
            }
            addEdge(s: number, d: number) {
                this.adjList[s].push(d);
                this.adjList[d].push(s);
            }
            bfs(u: number): Pair<number, number> {
                let pair = new Pair<number, number>(-1,-1);
                let distance = new Array<number>(u);

                distance.forEach(val => val = -1);
                let queue = new Array();
                queue.push(u);
                while(queue.length > 0) {
                    let t  = queue[0]; //the equivalent of a poll
                    for(let j=0; j< this.adjList[t].length; j++) {
                        let valAtIdx = this.adjList[t][j];
                        if (distance[valAtIdx] == -1) {
                            //if we haven't already visited this node
                            //add to the queue
                            distance[valAtIdx] = distance[valAtIdx] + 1;
                        }
                    }
                }
                let maxDis = 0;
                let nodeIdx = 0;
                for(let k = 0; k < this.totalVertices; ++k) {
                    if(distance[k] > maxDis) {
                        maxDis = distance[k];
                        nodeIdx = k;
                    }
                }
                return new Pair<number, number>(maxDis, nodeIdx);
            }   
        }
        
    }
    /*
    You are given an array of length n + 1 whose elements belong to the 
    set {1, 2, ..., n}. By the pigeonhole principle,
     there must be a duplicate. Find it in linear time and space.*/
    oneSixtyFour(array: number[]): number | boolean{
        //we know for sure the array will be length + 1
        //no need to do null checks?
        let uniqueVals = new Set<number>();
        array.forEach(num => {
            if(uniqueVals.has(num)) {
                //we are assuming we return the first 
                //duplicate value we find
                return num;
            } else {
                uniqueVals.add(num);
            }
        });
        return false;
    }
    oneSixtyFourSort(array: number[]): number | boolean{
        //we know for sure the array will be length + 1
        let uniqueVals = new Set<number>();
        array.sort();
        for(let i=1; i < array.length; i++ ){
            if(array[i] == array[i-1]) {
                return array[i];
            }
        }
        return false;
    }
    /*
    Given an array of integers, return a new array where
    each element in the new array is the number of smaller
    elements to the right of that element in the original 
    input array.
    For example, given the array [3, 4, 9, 6, 1],
    return [1, 1, 2, 1, 0], since:
    There is 1 smaller element to the right of 3
    There is 1 smaller element to the right of 4
    There are 2 smaller elements to the right of 9
    There is 1 smaller element to the right of 6
    There are no smaller elements to the right of 1
    */
    oneSixtyFive(arr: number[]): number[] | null {
        //we can safely assume, arr would't be null
        let counts: number[] = [];
        arr.forEach((val, idx, array) => {
            let count = 0;
            for(let j = (idx+1); j < array.length; j++) {
                if(array[j] < val) {
                    count += 1;
                };
            }
            counts.push(count);
        });
        return counts;
    }
}

let cp = new DCodingProblems();
/*console.log(cp.sixty([1, 5, 11, 5]));
console.log(cp.sixty([1, 3]));
console.log(cp.oneSixtyFour([1,2,3,4,5]));
console.log(cp.oneSixtyFourSort([1,2,3,4,5]));
console.log(cp.oneSixtyFourSort([1,2,2,4,3,4,5]));*/
console.log(cp.oneSixtyFive([3, 4, 9, 6, 1]));
 