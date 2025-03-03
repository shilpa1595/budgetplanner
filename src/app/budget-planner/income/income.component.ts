import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {

  incomeForm:any;
  selectedMonth:any;
  janIncome: any[] = [
    {source:'salary', amount:5000, investment:'401k'},
    {source:'freelancing', amount:2000, investment:'stocks'},
  ];
  FebIncome: any[] = [
    {source:'salary', amount:5000, investment:'401k'},
    {source:'Rental Income', amount:500, investment:'Real estate'},
  ];
  MarchIncome: any[] = [
    {source:'salary', amount:5000, investment:'401k'},
    {source:'freelancing', amount:2000, investment:'stocks'},
    {source:'Rental Income', amount:500, investment:'Real estate'},
  ];
  monthSelected:boolean= false;

  constructor(public fb:FormBuilder, private router:Router){
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default',{month:'long'});
  }
  ngOnInit() : void{
    this.incomeForm = this.fb.group({
      month:['',Validators.required],
      source:['',Validators.required],
      amount:['',Validators.required],
      investment:['',Validators.required]
    });
  }
  onSubmit(){
    if(this.incomeForm.valid){
      const newIncome = this.incomeForm.value;
      switch(this.selectedMonth){
        case 'January':
          this.janIncome.push(newIncome);
          break;
          case 'February':
          this.FebIncome.push(newIncome);
          break;
          case 'March':
          this.MarchIncome.push(newIncome);
          break;
          default:
      }
      this.incomeForm.reset();
      this.incomeForm.patchValue({month:'', source:'', amount:'',invetment:''});
    }
  }
  onChange(event:any){
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredIncomes();
  }
  getFilteredIncomes(){
    let filteredIncomes: any[] = [];
    switch(this.selectedMonth){
      case 'January':
        filteredIncomes = [...this.janIncome];
        break;
      case 'February':
        filteredIncomes = [...this.FebIncome];
        break;
      case 'March':
        filteredIncomes = [...this.MarchIncome];
        break;
        default:
        break;
    }
    return filteredIncomes;
  }

  calculateTotalIncome(month:string):number {
    let totalIncome = 0;
    for(const income of this.getIncomeForMonth(month)){
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  getIncomeForMonth(month:string):any[]{
    switch(month){
      case 'January':
       return this.janIncome;
      case 'February':
        return this.FebIncome;
      case 'March':
        return this.MarchIncome;
      default:
      return [];
    }
  }
  onBack(){
    this.router.navigate(['/budget-planner/dashboard']);
  }
  saveForm(){
    console.log("data saved");
  }
}
