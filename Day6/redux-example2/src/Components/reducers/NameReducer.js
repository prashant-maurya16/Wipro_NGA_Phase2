const initialState =
{
          sname:""
} 

const NameReducer = (state = initialState ,action) => {
          switch(action.type) {
                    case 'PRASHANT' : 
                        return {...state, sname : 'Hi I am PRASHANT...'};
                    case 'SRAVANI' : 
                        return {...state, sname : 'Hi I am Sravani...'};
                    case 'LAKSHYA' :
                        return {...state, sname : 'Hi I am Lakshya...'};
                    case 'SAM' : 
                        return {...state, sname : 'Hi I am SAM...'};
                    default : 
                        return state;
                }



}
export const prashant = () => ({type : 'PRASHANT'});
export const sravani = () => ({type : 'SRAVANI'});
export const lakshya = () => ({type : 'LAKSHYA'});
export const sam = () => ({type : 'SAM'});


export default NameReducer;