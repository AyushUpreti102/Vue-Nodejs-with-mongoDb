import axios from '../../plugins/axios.ts';

export const fetchTest = async () => {
    const { data } = await axios.get('/comments/5a9427648b0beebeb69579e7');
    return data;
};