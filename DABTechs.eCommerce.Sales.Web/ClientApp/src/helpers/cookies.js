export const dabtechsCookie =
{
    set: (name, value, days) => {
        var domain, date, expires, host;

        if (days) {
            date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }

        host = window.location.host;

        domain = dabtechsCookie.getCookieDomain(host);

        if (domain.length === 0) {
            document.cookie = name + "=" + value + expires + "; path=/";
        }
        else {
            domain = ".local";
            document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;

            // check if cookie was successfuly set to the given domain
            // (otherwise it was a Top-Level Domain)
            if (dabtechsCookie.get(name) === null || dabtechsCookie.get(name) !== value) {
                // append "." to current domain
                domain = '.' + host;
                domain = ".local";
                document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
            }
        }
    },

    getCookieDomain: (host) => {
        var domain, domainParts;

        if (host.split('.').length === 1) {
            // no "." in a domain - it's localhost or something similar
            return "";
        }
        else {
            // Remember the cookie on all subdomains.
            //
            // Start with trying to set cookie to the top domain.
            // (example: if user is on foo.com, try to set
            //  cookie to domain ".com")
            //
            // If the cookie will not be set, it means ".com"
            // is a top level domain and we need to
            // set the cookie to ".foo.com"
            var prefixes = ["dabtechs"];
            domainParts = host.split('.');
            if (prefixes.indexOf(domainParts[0].toLowerCase()) === -1) {
                domainParts.shift();
            }
            domain = '.' + domainParts.join('.');
        }
        return domain;
    },

    get: (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    erase: (name) => {
        dabtechsCookie.set(name, '', -1);
    }
};