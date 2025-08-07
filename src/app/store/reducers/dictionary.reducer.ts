import {DictionaryAction, DictionaryActionType} from '../actions/dictionary.action';
import {Dictionary} from "../../models/dictionary.interface";

const initialState: Dictionary =
    {
        license: {},
        meanings: [],
        phonetic: '',
        phonetics: [],
        sourceUrls: [],
        word: 'Enter your first word'
    }
;

export function dictionaryReducer(
    state: Dictionary = initialState,
    action: DictionaryAction
) {
    switch (action.type) {
        case DictionaryActionType.ADD_ITEM:
            return {...action.payload};
        default:
            return state;
    }
}
