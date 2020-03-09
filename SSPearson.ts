class CPStack<T> {
    data:T[] = [];
    peek(): T | null {
        if(this.data.length == 0) return null;
        return this.data[this.data.length -1];
    }
    push = (val:T) => this.data.push(val);
    pop = () => this.data.pop();
    isEmpty = (): boolean => this.data.length == 0;
}
class SSPearsonCodingProblems {
    
    /*
    Given a string consisting entirely of the characters ()[]{}, 
    determine if it is ‘balanced’ . That is, every opening bracket must 
    have a closing bracket of the same type following it, and the string 
    in between the pair must also be balanced. For the purposes of the
    problem, an empty string should be considered balanced.
    */
    parenthesisBalanced(str: string): boolean | null {
        if(str == null) {
            return null;
        }
        let parenStack = new CPStack<string>();
        for(let i=0; i< str.length; i++) {
            let char = str.charAt(i);
            if(char == ' ') {
                continue;
            }
            let topVal = parenStack.peek();
            if(topVal == null) {
                parenStack.push(char);
            } else {
                if((topVal == '{' && char =='}') ||
                    (topVal == '(' && char == ')' ||
                    topVal =='[' && char == ']')) {
                        parenStack.pop();
                } else {
                    parenStack.push(char);
                }
            }
        }
        return parenStack.isEmpty();
    }
    /*
    The input to this problem consists of a string of n comma-separated values, each value
    being an integer or a string. The required output is n consecutive lines, where line i
    contains the ith value of the input.
    NOTICE – string may contain commas (See Input 2 and 3 below).*/    
    csvParsing(str: string): string {
        if(str == null || str == undefined) {
            return "";
        }
        let strArray: string[] = [];
        let curWord:String[] = [];
        for(let i=0; i< str.length; i++) {
            let char = str.charAt(i);
            //great that's one scenario
            //now let's look at a scenario when we find a quote
            if(char == '"' || char == "'") {
                curWord.push(char);
                for(let j=i+1; j < str.length; j++) {
                    let charAtJ = str.charAt(j);
                    curWord.push(charAtJ);
                    if(charAtJ == '"' || charAtJ == "'") {
                        strArray.push(curWord.join(''));
                        curWord = [];
                        i = j+1;
                        break;
                    }
                }
            } else {
                //if we find a comma, push a new array
                if(char ==',') { 
                    strArray.push(curWord.join(''));
                    curWord = [];
                } else {
                    curWord.push(char);
                }
            }
        }
        return strArray.join("\n");
    }
    /*
    You are given two strings, a ‘parent’ string and a ‘query’ string respectively. Your task is
    to determine how many times the query string – or an anagram of the query string –
    appears in the parent string.
    NOTE: There are a range of solutions to this problem. With a little thought, you can
    massively improve the efficiency of your solution. The optimal solution runs almost
    instantly even for extremely large (1 million+ characters) parent and query strings.
    */
    //Not the most efficient solution?
    anagramDetect(problem: string, query: string): number {
        if(problem == null || query  == null) {
            return 0;
        }
        if(query.length > problem.length) {
            return 0;
        }
        let n = 0
        let sortJoin = (a:string) => a.split('').sort().join('');
        let sortedQ = sortJoin(query);
        problem.split('').map((_, i) => {
            if (sortJoin(problem.substr(i, query.length)) == sortedQ) {
                n += 1;
            }
        });
        return n; 
    }
    /*
    You are given the dimension of a h x w grid filled with consecutive integers from left to
    right, top to bottom, starting with 1.
    You are also given a starting position r c. The output should be the ordered list of
    integers obtained by spiralling outward in an anti-clockwise direction from row r column
    c, starting upward.
    SOLUTION NOT CORRECT, AT THIS STAGE
    */
    printAnticlockWise(endRow: number, endCol: number, a: number[][]) {
        let iter = 0; 
        let startRow = 0; 
        let startCol = 0;
       
       let count = 0;
       let total: number = endRow * endCol;
       while(startRow < endRow && startCol < endCol) {
           if(count == total) {
               break;
           }
           for(iter = startRow; iter < endRow; ++iter) {
               console.log(`${a[iter][startCol]} `);
           }
           startCol += 1;
           if(count == total) {
               break;
           }
           for(iter = startCol; iter < endCol; ++iter) {
               console.log(`${a[endRow -1][iter]} `);
           }
           endRow -= 1;
           
           if(count == total) break;
           
           if(startRow < endRow) {
               for(iter = endRow - 1; iter >= startRow; --iter) {
                   console.log(`${a[iter][endCol - 1]} `);
                   count += 1;
               }
               endCol -= 1;
           }
       }
    }
}

let problems = new SSPearsonCodingProblems();   
console.log("****************PARENTHESIS BALANCED****************")
console.log(problems.parenthesisBalanced("()[[[]{}]]"));
console.log(problems.parenthesisBalanced(""));
console.log(problems.parenthesisBalanced("()[[[]{]]"));
console.log(problems.parenthesisBalanced("()[[[]]]"));
console.log(problems.parenthesisBalanced("())[]{}"));
console.log(problems.parenthesisBalanced("[(])"));
console.log("*****CSV PARSING*****");
let complexStr = `1,"Que?","Kay?",2,"Si.","Sea? Kay, sea?","No, no, no. Que...
‘what’.",234,"Kay Watt?","Si, que ‘what’.","C.K.
Watt?",3,"Yes!","comma,comma, comma , :)"`;
console.log(problems.csvParsing(complexStr));
console.log(problems.csvParsing("”grapes”"));
console.log(problems.csvParsing("2,6,3,2,5"));
console.log(problems.csvParsing('"grapes","cheese,cake"'));
console.log("*********ANAGRAM DETECT**************");
console.log(problems.anagramDetect("AdnBndAndBdaBn","dAn"));
console.log(problems.anagramDetect("AbrAcadAbRa","cAda"));
console.log(problems.anagramDetect("AbrAc","cA"));
console.log(problems.anagramDetect("AbrAc","cAaa"));
console.log(problems.anagramDetect("Ab","cAda"));
console.log("**************");
let a: number[][] = [ [ 1, 2, 3, 4, 5, 6 ], 
[ 7, 8, 9, 10, 11, 12 ], 
[ 13, 14, 15, 16, 17, 18 ] ]; 
//console.log(problems.printSpiral(3,6,a));*/
//console.log(
  //  problems.csvParsing("pears’,“apples”,”walnuts”,”grapes”,”cheese,cake"));
