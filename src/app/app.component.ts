import { Component } from "@angular/core";
import { ConfigService } from "./config.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular";
  sortDir = 1;
  logsData: any = [];

  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.getServiceData();
  }

  getServiceData() {
    this.config.getData().subscribe(data => {
      this.logsData = data;
    });
  }

  onSortClick(event, val) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains("arrow-up")) {
      classList.remove("arrow-up");
      classList.add("arrow-down");
      this.sortDir = -1;
    } else {
      classList.add("arrow-up");
      classList.remove("arrow-down");
      this.sortDir = 1;
    }
    if(val=== 'logs') {
      this.sortArr("logs");
    } else if(val === 'status') {
      this.sortArr("status");
    } else if(val === 'timestamp') {
      this.sortArr("timestamp");
    }
  }

  sortArr(colName: any) {
    this.logsData.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }
}
