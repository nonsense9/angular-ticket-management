import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import * as randomWords from 'random-words';

import {DictionaryService} from "../../service/dictionary.service";
import {Dictionary} from "../../models/dictionary";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

import {AddItemAction} from "../../store/actions/dictionary.action";
import {State} from "../../store/models/state.model";

@Component({
    selector: 'app-dictionary',
    templateUrl: './dictionary.component.html',
    styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

    word: object[];
    formGroup = this.fb.group({
        dictionary: ['', [Validators.required]],
    });
    dictionaryItems$: Observable<Dictionary>;

    constructor(private dictionaryService: DictionaryService, private fb: FormBuilder, private toastr: ToastrService, private store: Store<State>) {
    }

    ngOnInit(): void {
        this.dictionaryItems$ = this.store.select((store) => store.dictionary);

    }


    getWord(event: any) {
        if (event.keyCode === 13) {
            if (!this.formGroup.get('dictionary').value) return;
            this.dictionaryService.getWord(this.formGroup.get('dictionary').value).subscribe({
                next: (res) => {
                    this.assignValuesFromRequest(res)
                    this.store.dispatch(new AddItemAction(res[0]))
                },
                error: (err) => {
                    if (err.status === 404) {
                        this.toastr.error('There is no such word. Word not found.')
                    } else {
                        this.toastr.error('Something went wrong!')
                    }
                },
            })
            this.formGroup.get('dictionary').reset();
        }
    }

    getRandomWord() {
        const random = randomWords.generate()
        this.dictionaryService.getWord(String(random)).subscribe((res) => {
            this.assignValuesFromRequest(res)
            this.store.dispatch(new AddItemAction(res[0]))
        })
    }

    assignValuesFromRequest(result: Dictionary[]) {
        this.word = result
        this.playAudio();
        this.toastr.success('Success!')
    }

    playAudio() {
        if (this.word && this.word.length > 0) {
            const btns = this.word.map((i: any) => {
                return i
            })
            const {phonetics} = btns[0]
            const audios = phonetics?.map((i: any) => i.audio);
            let filteredAudios = audios?.filter((i: any) => i !== '')
            if (!filteredAudios.length) {
                this.toastr.error('No audio to play')
            } else {
                let a = new Audio(filteredAudios[0])
                a.play();
            }
        }
    }
}
