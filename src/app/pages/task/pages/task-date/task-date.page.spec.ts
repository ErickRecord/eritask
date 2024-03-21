import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDatePage } from './task-date.page';

describe('TaskDatePage', () => {
  let component: TaskDatePage;
  let fixture: ComponentFixture<TaskDatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TaskDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
