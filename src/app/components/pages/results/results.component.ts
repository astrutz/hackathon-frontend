import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TabItem, Tabs, TabsInterface } from 'flowbite';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'kickathon-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements AfterViewInit {

  protected dataService: DataService = inject(DataService);

  @ViewChild('defaultTab') tabElement!: ElementRef;

  @ViewChild('oneVsOneTab') oneVsOneTab!: ElementRef;
  @ViewChild('oneVsOne') oneVsOne!: ElementRef;

  @ViewChild('twoVsTwoTab') twoVsTwoTab!: ElementRef;
  @ViewChild('twoVsTwo') twoVsTwo!: ElementRef;

  tabsElements!: TabItem[];

  options = {
    defaultTabId: 'settings',
    activeClasses: 'bg-amber-600',
    inactiveClasses: 'bg-green-100',
    onShow: () => { console.log('tab is shown')}
  }

  instanceOptions = {
    id: 'tabs-example',
    override: true
  }

  ngAfterViewInit() {
    this.tabsElements = [
      {
        id: 'oneVsOne',
        triggerEl: this.oneVsOneTab.nativeElement,
        targetEl: this.oneVsOne.nativeElement
      },
      {
        id: 'twoVsTwo',
        triggerEl: this.twoVsTwoTab.nativeElement,
        targetEl: this.twoVsTwo.nativeElement
      }
    ]

    let tabs: Tabs = new Tabs(this.tabElement.nativeElement, this.tabsElements, this.options, this.instanceOptions)
    tabs.show('oneVsOne')
  }


}
