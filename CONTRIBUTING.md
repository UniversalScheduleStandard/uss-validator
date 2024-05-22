---
permalink: /contributing
---

# Contributing guide

Thank you for your help making uss-validator better! Every contribution is appreciated. There are many areas where you can contribute.

We welcome implementing new features that will benefit many users and ideas to improve our documentation.

At the Universal Schedule Standard, we are committed to creating more equitable and inclusive spaces for our community and team members to contribute to discussions that affect both this project and our ongoing work in the open source ecosystem.

We strive to create an environment of respect and healthy discourse by setting standards for our interactions and we expect it from all members of our community - from long term project member to first time visitor. For more information, review our [code of conduct](./CODE_OF_CONDUCT.md) and values.

::: tip Submit issue first
If you plan to implement a new feature or some other change please create an issue first, to make sure that your work is not lost.
:::

[[toc]]

## Documentation

If anything is unclear, or could be explained better, we appreciate the time you spend correcting or clarifying it.

There is a link in the bottom of each website page to quickly edit it.

## Issues

Before submitting the issue:

- Search the existing issues
- Provide all the relevant information, reducing both your schema and data to the smallest possible size when they still have the issue.

We value simplicity - simplifying the example that shows the issue makes it more valuable for other users. This process helps us reduce situations where an error is occurring due to incorrect usage rather than a bug.

### Bug reports

Please make sure to include the following information in the issue:

1. What version of uss-validator are you using?
2. Does the issue happen if you use the latest version?
3. Validation result, data AFTER validation, error messages.
4. What results did you expect?

[Create bug report](https://github.com/universalschedulestandard/universalschedulestandard/issues).

<a name="changes"></a>

### Change proposals

[Create a proposal](https://github.com/universalschedulestandard/universalschedulestandard/issues) for a new feature, option or some other improvement.

Please include this information:

1. The version of uss-validator you are using.
2. The problem you want to solve.
3. Your solution to the problem.
4. Would you like to implement it?

If you’re requesting a change, it would be helpful to include this as well:

1. What you did.
2. What happened.
3. What you would like to happen.

Please include as much details as possible - the more information, the better.

<a name="installation"></a>

### Installation and dependency issues

[Create an issue](https://github.com/universalschedulestandard/universalschedulestandard/issues) to report problems that happen during uss-validator installation or when uss-validator is missing some dependency.

Before submitting the issue, please try the following:

- use the latest stable Node.js and `npm`
- remove `node_modules` and `package-lock.json` and run `npm install` again

If nothing helps, please submit:

1. The version of uss-validator you are using
2. Operating system and Node.js version
3. Link to (or contents of) package.json and package-lock.json
4. Error messages
5. The output of `npm ls`

### How we make decisions

We value conscious curation of our library size, and balancing performance and functionality. To that end, we cannot accept every suggestion. When evaluating pull requests we consider:

- Will this benefit many users or a niche use case?
- How will this impact the performance of uss-validator?
- How will this expand our library size?

To help us evaluate and understand, when you submit an issue and pull request:

- Explain why this feature is important to the user base
- Include documentation
- Include test coverage with any new feature implementations

Please include documentation and test coverage with any new feature implementations.

### Development

Running tests:

```bash
npm install
git submodule update --init
npm test
```

### Pull requests

We want to iterate on the code efficiently. To speed up the process, please follow these steps:

1. Submit an [issue with the bug](https://github.com/universalschedulestandard/universalschedulestandard/issues) or with the proposed change (unless the contribution is to fix the documentation typos and mistakes).
2. Describe the proposed api and implementation plan (unless the issue is a relatively simple bug and fixing it doesn't change any api).
3. Once agreed, please write as little code as possible to achieve the desired result. We are passionate about keeping our library size optimized.
4. Please add the tests both for the added feature and, if you are submitting an option, for the existing behaviour when this option is turned off or not passed.
5. Please avoid unnecessary changes, refactoring or changing coding styles as part of your change (unless the change was proposed as refactoring).
6. Follow the coding conventions even if they are not validated.
7. Please run the tests before committing your code.
8. If tests fail in CI build after you make a PR please investigate and fix the issue.

### Contributions license

When contributing the code you confirm that:

1. Your contribution is created by you.
2. You have the right to submit it under the MIT license.
3. You understand and agree that your contribution is public, will be stored indefinitely, can be redistributed as the part of uss-validator or another related package under MIT license, modified or completely removed from uss-validator.
4. You grant irrevocable MIT license to use your contribution as part of uss-validator or any other package.
5. You waive all rights to your contribution.
6. Unless you request otherwise, you can be mentioned as the author of the contribution in the uss-validator documentation and change log.