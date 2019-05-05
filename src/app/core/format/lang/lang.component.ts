import { Component, OnInit } from '@angular/core';

import { BaseLang } from './BaseLang';

@Component({
  selector: 'lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss'],
})
export class LangComponent extends BaseLang implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
