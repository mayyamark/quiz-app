const answerFinishSchema = {
    id: (value) => {
        if (!value) {
            return 'Question points is required!';
        }
        const answerId = Number(value);
        if (answerId === Number.NaN || answerId < 1) {
            return 'Question id should be valid positive number!';
        }

        return null;
    },
    markedTrue: (value) => {   
        if (!value) {
            return 'markedTrue is required!';
        }

        if(!Array.isArray(value)) {
            return 'markedTrue should be an array!';
        }
        
        const errors = value.map(answerIsTrue => {
            if (!answerIsTrue) {
                return 'Id of marked true is required!';
            }
            const answerMarkedTrueId = Number(answerIsTrue);
            if (answerMarkedTrueId === Number.NaN || answerMarkedTrueId < 1) {
                return 'Answer marked true id should be valid positive number!';
            }
    
            return null;
        }).filter(error => error != null);
        return errors.length > 0 ? errors : null;
    },
};

export default answerFinishSchema;