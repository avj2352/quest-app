export const isParenthesisMatching = (str) => {
    let stack = [];

    let open = {
        '{': '}',
        '[': ']',
        '(': ')'        
    };

    let closed = {
        '}': true,
        ']': true,
        ')': true
    }

    for (let i = 0; i < str.length; i++) {

        let char = str[i];

        if (open[char]) {
            stack.push(char);
        } else if (closed[char]) {
            if (open[stack.pop()] !== char) return {status: false, char: [char]};
        }
    }
    if (stack.length === 0) {return { status: true, char: null}; }
    else {return {status: false, char: [...stack]};}
}

