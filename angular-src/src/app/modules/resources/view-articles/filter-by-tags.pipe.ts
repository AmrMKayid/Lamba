import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTags'
})
export class FilterByTagsPipe implements PipeTransform {

  transform(articles: any[], tagIDs: string[]): any {
    if (!articles || !tagIDs || tagIDs.length === 0) {
      return articles;
    }
    return articles.filter((article) => {
      return article.tags.some((tag) => {
        return tagIDs.includes(tag);
      });
    });
  }

}
