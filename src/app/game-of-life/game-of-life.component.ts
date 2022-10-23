import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit {

  @ViewChild("board", { static: false }) board!: ElementRef
  @ViewChild("StartButton", { static: false }) startButton!: ElementRef

  colSize: number= 20
  rowSize: number= 20

  isRunning: boolean = false

  grid: number[][] = this.newGrid(this.colSize, this.rowSize)

  constructor( private renderer2: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createGrid()
  }

  createGrid() {
    for(let i = 0; i < this.colSize; i++){
      const col = this.renderer2.createElement('tr')
      this.renderer2.appendChild(this.board.nativeElement, col )
      for(let j = 0; j < this.rowSize; j++){
        const cell = this.renderer2.createElement('td')
        this.renderer2.addClass(cell, `${i}_${j}` )
        this.renderer2.listen(cell, 'click', () => this.handleCellClick(event) )
        this.renderer2.appendChild(col, cell)
      }
    }
    this.drawGrid(this.grid, this.colSize, this.rowSize)
  }

  newGrid(col: number, row: number) {
    return new Array(col)
      .fill(0)
      .map(() =>
        new Array(row).fill(0)
      );
  }

  drawGrid(grid: number[][], colSize: number, rowSize: number){
    for (let i = 0; i < colSize; i++) {
      for (let j = 0; j < rowSize; j++) {
        const cell = grid[i][j]
        const element = document.getElementsByClassName(`${i}_${j}`)
        if(cell){
          element[0].classList.add('_live')
        }else{
          element[0].classList.remove('_live')
        }
      }
    }
  }

  handleCellClick(event: Event | undefined){

    (event?.target as Element).classList.contains("_live")
    ? (event?.target as Element).classList.remove("_live")
    : (event?.target as Element).classList.add("_live")
  }

  nextGen(grid: number[][]) {
    const nextGen = grid.map((arr) => [...arr]);

    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const currentCell = grid[col][row];
        let sumNeighbors = 0;

        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {
              continue;
            }

            const x = col + i;
            const y = row + j;

            if (x >= 0 && y >= 0 && x < this.colSize && y < this.rowSize) {
              const currentNeighbor = grid[col + i][row + j];
              sumNeighbors += currentNeighbor;
            }
          }
        }

        if (currentCell == 0 && sumNeighbors === 3) {
          nextGen[col][row] = 1;
        }
        if (currentCell == 1 && sumNeighbors < 2){
          nextGen[col][row] = 0;
        }
        if (currentCell == 1 &&  sumNeighbors > 3){
          nextGen[col][row] = 0;
        }
      }
    }
    return nextGen;
  }

  updateGrid() {
    if(!this.isRunning){
      return
    }
    this.grid = this.nextGen(this.grid);
    this.drawGrid(this.grid, this.colSize, this.rowSize);
    setTimeout(() => {
      this.updateGrid()
    }, 500)
  }

  handleStartButton(){
    if (this.isRunning){
      this.isRunning = false
      this.startButton.nativeElement.innerHTML = "Start"
    }else{
      this.isRunning = true
      this.updateGrid()
      this.startButton.nativeElement.innerHTML = "Pausa"
    }
  }

  handleReset() {
    for (var i = 0; i < this.rowSize; i++) {
        for (var j = 0; j < this.colSize; j++) {
            this.grid[i][j] = 0;
        }
    }
    this.isRunning = false
    this.startButton.nativeElement.innerHTML = "Start"
    this.drawGrid(this.grid, this.colSize, this.rowSize)
  }

  handleRandomize(){
    for (var i = 0; i < this.rowSize; i++) {
      for (var j = 0; j < this.colSize; j++) {
          this.grid[i][j] = Math.round(Math.random());
      }
  }
  this.drawGrid(this.grid, this.colSize, this.rowSize)
  }

}
