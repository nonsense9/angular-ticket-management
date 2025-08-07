import {Action} from "@ngrx/store";
import {Dictionary} from "../../models/dictionary.interface";

export enum DictionaryActionType {
  ADD_ITEM = '[DICTIONARY] Add word for Dictionary',
}
export class AddItemAction implements Action {
  readonly type = DictionaryActionType.ADD_ITEM;
  constructor(public payload: Dictionary) {}
}
export type DictionaryAction = AddItemAction;
