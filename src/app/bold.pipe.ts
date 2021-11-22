import { Pipe, PipeTransform, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "boldRegex",
})
export class BoldPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, regex: string): string {
    return this.sanitizer.sanitize(
      SecurityContext.HTML,
      value.replace(new RegExp(`(${regex})`, "gi"), "<b>$1</b>")
    );
  }
}
