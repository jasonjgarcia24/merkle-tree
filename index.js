class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }

    getRoot() {
        if (this.leaves.length === 1) { return this.leaves }

        let leaves = this.leaves;

        while (leaves.length !== 1) {
            for (let i = 1; i <= leaves.length; i += 1) {
                if (leaves[i]) {
                    leaves[i - 1] = this.concat(leaves[i - 1], leaves[i]);
                    leaves.splice(i, 1);
                }
            }
        }
        return leaves[0]
    }

    getProof(index) {
        let leaves = this.leaves;
        let leavesLength;
        let proof = [];
        console.log(`length: ${leaves.length}`)

        while (leaves.length !== 1) {
            // Even index
            if (index % 2 === 0) {
                proof.push({ data: leaves[index + 1], left: false });
            }
            // Odd index
            else {
                proof.push({ data: leaves[index - 1], left: true });
            }
            index = Math.floor(index / 2);

            // Hash remaining leaves
            leavesLength = leaves.length;
            for (let i = 1; i <= leavesLength; i += 1) {
                if (leaves[i]) {
                    leaves[i - 1] = this.concat(leaves[i - 1], leaves[i]);
                    leaves.splice(i, 1);
                }
            }
        }

        // console.log("proof: ", proof);
        return proof;
    }
}

module.exports = MerkleTree;