
export default class BodyClass {
    constructor(router){
        this.bodyClass = document.body.className;
        this.router = router;
    }

    set router(router) {
        router.beforeEach((to, from, next) => {
            var parent = router.options.routes;
            var matched = this.parseMatched(to.matched);
            var additionalClassName = "";

            // console.log(parent)

            //is a home page?
            if (to.path == '/') {

                additionalClassName = this.updateClassFromRoute(additionalClassName, to);

            }
            //not homepage
            else if (matched.length > 0) {

                for (let index in matched) {

                    let routes = parent.children ? parent.children : parent;
                    let found = this.findMatchInRoutesByPath(routes, matched[index]);

                    if (found) {
                        parent = found;
                        additionalClassName = this.updateClassFromRoute(additionalClassName, found);

                    }

                }

            }

            document.body.className = (this.bodyClass + additionalClassName).trim();

            next();

        })

    }

    parseMatched(matchedArray) {

        var matched = [];

        for (let index in matchedArray) {

            let prev = matched.join('/');

            matched.push(
                matchedArray[index].path
                    .replace(/^\/|\/$/g, '')
                    .replace(prev, '')
                    .replace(/^\/|\/$/g, '')
            );

        }

        return matched;

    }

    findMatchInRoutesByPath(routes, matchedItem) {
        // console.log(routes, matchedItem)
        return routes.find((o) => {

            return o.path.replace(/^\/|\/$/g, '') == matchedItem;

        });

    }

    getClassForRoute(route) {

        return route.meta ? route.meta.bodyClass : null;

    }

    updateClassFromRoute(className, route) {

        var routeClass = this.getClassForRoute(route);

        if (routeClass) {

            let routeBodyClass = routeClass.replace(/^!/, '');

            if (routeClass.indexOf('!') === 0) {

                className = " " + routeBodyClass;

            } else {

                className += " " + routeBodyClass;

            }

        }

        return className;

    }

}
