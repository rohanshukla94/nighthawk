
<h3 align="center">nighthawk</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">an open source version of balena cloud using openBalena API's for AMR fleet management
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Wrapper around openBalena API's for deploying and managing AMR Robots
Includes api based support for mapping(scanning), SLAM, device management, mission control, waypoint & prohibition zones.

This project is solely tested on ROS Melodic. (WIP)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

There are basically 2 projects here. The directory Ros is built/compiled first
Consequent directory, the parent one is compiled afterwards

### Installing

A step by step series of examples that tell you how to get a development env running.


```
cd ~/dir/ros && npm i
cd ../ && npm i && npm run buid
```


End with an example of getting some data out of the system or using it for a little demo.

## 🔧 Running the tests <a name = "tests"></a>

```
npm test
```


## 🎈 Usage <a name="usage"></a>

```
Run your ros melodic 
```

## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using">Typescript</a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@rohanshukla](https://github.com/rohanshukla9) - Idea & Initial work

