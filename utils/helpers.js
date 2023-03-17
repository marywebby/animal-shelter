module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`
        }

        return word;
    },
    get_name: (animal) => {
        return animal.name;
    },
    get_age: (animal) => {
        return animal.age;
    },
    get_breed: (animal) => {
        return animal.breed;
    },
    get_sex: (animal) => {
        return animal.sex ? 'Female' : 'Male';
    },
    get_hypo: (animal) => {
        return animal.hypoallergenic ? 'True' : 'False';
    }
};