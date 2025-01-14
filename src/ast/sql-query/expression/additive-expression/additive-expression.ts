/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  CaseExpression,
  Function,
  Interval,
  MultiplicativeExpression,
  NumberType,
  RefExpression,
  StringType,
  Sub,
} from '../../../index';
import { Parens } from '../../helpers';

export interface AdditiveExpressionValue {
  parens?: Parens[];
  op?: string[] | null;
  ex: (
    | MultiplicativeExpression
    | Sub
    | StringType
    | RefExpression
    | NumberType
    | Function
    | CaseExpression
    | Interval)[];
  spacing?: string[];
}

export class AdditiveExpression {
  public parens: Parens[];
  public ex: (
    | MultiplicativeExpression
    | Sub
    | StringType
    | RefExpression
    | NumberType
    | Function
    | CaseExpression
    | Interval)[];
  public op: string[] | null;
  public spacing: string[];

  constructor(options: AdditiveExpressionValue) {
    this.parens = options.parens ? options.parens : [];
    this.op = options.op ? options.op : null;
    this.ex = options.ex;
    this.spacing = options.spacing ? options.spacing : [''];
  }

  toString() {
    const val: string[] = [];
    this.parens.map(paren => {
      val.push(paren.open[0] + paren.open[1]);
    });
    this.ex.map((ex, index) => {
      val.push(ex.toString());
      if (index < this.ex.length - 1 && this.op) {
        val.push(
          (this.spacing[index * 2] ? this.spacing[index * 2] : '') +
            this.op[index] +
            (this.spacing[index * 2 + 1] ? this.spacing[index * 2 + 1] : ''),
        );
      }
    });
    this.parens.map(paren => {
      val.push(paren.close[0] + paren.close[1]);
    });
    return val.join('');
  }

  addParen(open: string[], close: string[]) {
    this.parens.push({ open, close });
    return new AdditiveExpression({
      parens: this.parens,
      ex: this.ex,
      spacing: this.spacing,
      op: this.op,
    });
  }
}
