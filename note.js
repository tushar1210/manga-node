function MainFunction($http) {
    var vm = this;

    vm.QuickSearching = !1, vm.QuickResult = [], vm.QuickSearch = function () {
        vm.QuickSearching = !0, $http({
            method: "POST",
            url: "/_search.php"
        }).then(function (c) {
            void 0 === c.data.success ? (vm.QuickResult = c.data, vm.QuickSearching = !1) : (vm.QuickSearchErr = c.data.val, vm.QuickResult = [])
        }, function (c) {
            vm.QuickSearching = !1
        })
    }, vm.QuickSearch(), vm.FilteredArr = [], vm.QuickSearchSubmit = function () {
        1 == vm.FilteredArr.length ? window.location.href = "/manga/" + vm.FilteredArr[0].i : window.location.href = "/search/?name=" + vm.Keyword
    };



    vm.FilteredArr = [];
    vm.QuickSearchSubmit = function () {
        if (vm.FilteredArr.length == 1) {
            window.location.href = "/manga/" + vm.FilteredArr[0].i
        } else {
            window.location.href = "/search/?name=" + vm.Keyword
        }
    };
    vm.AuthType = "Login", vm.Authenticating = !1, vm.AuthWarning = "", vm.ResetSuccess = "", vm.Login = function () {
        vm.Authenticating = !0, vm.AuthWarning = "", vm.ResetSuccess = "", $http({
            method: "POST",
            url: "/auth/login.php",
            data: {
                EmailAddress: vm.AuthEmail,
                Password: vm.AuthPassword
            }
        }).then(function (t) {
            t.data.success ? location.reload() : "old_db" == t.data.val ? (vm.AuthType = "Register", vm.AuthWarning = "We just transfered our database. Please register again with this Email Address and all of your subscription will transfer automatically.") : vm.AuthWarning = t.data.val, vm.Authenticating = !1
        }, function (t) {
            vm.AuthWarning = "Network Error. Please try again later.", vm.Authenticating = !1
        })
    }, vm.Register = function () {
        vm.Authenticating = !0, vm.AuthWarning = "", vm.ResetSuccess = "", grecaptcha.execute("6Ld2-aMZAAAAAD9ESUQP8ijtHxtoWAwv2DOsJJ0n", {
            action: "homepage"
        }).then(function (t) {
            vm.Captcha = t, $http({
                method: "POST",
                url: "/auth/register.php",
                data: {
                    EmailAddress: vm.AuthEmail,
                    Username: vm.AuthUsername,
                    Password: vm.AuthPassword,
                    Captcha: vm.Captcha
                }
            }).then(function (t) {
                t.data.success ? location.reload() : vm.AuthWarning = t.data.val, vm.Authenticating = !1
            }, function (t) {
                vm.AuthWarning = "Network Error. Please try again later.", vm.Authenticating = !1
            })
        })
    }, vm.ResetPassword = function () {
        vm.Authenticating = !0, vm.AuthWarning = "", vm.ResetSuccess = "", $http({
            method: "POST",
            url: "/auth/reset.php",
            data: {
                EmailAddress: vm.AuthEmail
            }
        }).then(function (t) {
            t.data.success ? (vm.AuthEmail = "", vm.AuthUsername = "", vm.AuthPassword = "", vm.ResetSuccess = "If the email address exists, we will send a link to reset your password in a few seconds. If you don't see the email, check other places it might be, like your junk, spam, social, or other folders.") : vm.AuthWarning = t.data.val, vm.Authenticating = !1
        }, function (t) {
            vm.AuthWarning = "Network Error. Please try again later.", vm.Authenticating = !1
        })
    }, vm.AuthToggle = function () {
        "Login" == vm.AuthType ? vm.Login() : "Register" == vm.AuthType ? vm.Register() : "Reset" == vm.AuthType && vm.ResetPassword()
    };

    vm.HotArr = ['7', '4379', '158', '157', '3289', '12', '2516', '288', '361', '4027', '4446', '2772', '3', '3824', '3573', '153', '6', '3205', '3361', '3575', '155', '24', '4504', '3701', '111', '89', '3864', '152', '4401', '4191', '3983', '4557', '1689', '4542', '4166', '4224', '20', '4396', '384', '3081', '4815', '4992', '3897', '4315', '42', '2209', '4052', '151', '266', '3378', '271', '85', '2280', '4263', '3669', '2130', '4', '3170', '3276', '2503', '4100', '1693', '4663', '4522', '235', '3571', '4031', '4940', '3923', '2514', '3356', '3644', '3724', '3426', '2369', '28', '4485', '4394', '4833', '108', '3465', '3661', '3420', '4650', '219', '4117', '3875', '4921', '4011', '3541', '4281', '5198', '4494', '88', '4044', '3235', '3321', '5175', '5', '139'];
    vm.SubArr = [''];


    vm.Random = function (array) {
        return array[Math.floor(Math.random() * array.length)];
    };

    vm.TopTenJSON = [{
        "IndexName": "One-Piece",
        "SeriesName": "One Piece"
    }, {
        "IndexName": "Martial-Peak",
        "SeriesName": "Martial Peak"
    }, {
        "IndexName": "Tower-Of-God",
        "SeriesName": "Tower of God"
    }, {
        "IndexName": "The-God-Of-High-School",
        "SeriesName": "The God of High School"
    }, {
        "IndexName": "Tales-Of-Demons-And-Gods",
        "SeriesName": "Tales of Demons and Gods"
    }, {
        "IndexName": "Berserk",
        "SeriesName": "Berserk"
    }, {
        "IndexName": "Boku-No-Hero-Academia",
        "SeriesName": "Boku no Hero Academia"
    }, {
        "IndexName": "Haikyu",
        "SeriesName": "Haikyu!!"
    }, {
        "IndexName": "Kingdom",
        "SeriesName": "Kingdom"
    }, {
        "IndexName": "Kanojo-Okarishimasu",
        "SeriesName": "Kanojo, Okarishimasu"
    }];
    vm.RecommendationJSON = [{
        "IndexName": "Tonari-No-Atashi",
        "SeriesName": "Tonari no Atashi",
        "Year": "2008",
        "ScanStatus": "Complete",
        "PublishStatus": "Complete",
        "Genres": ["Drama", "Romance", "School Life", "Shoujo"]
    }, {
        "IndexName": "Witch-Craft-Works",
        "SeriesName": "Witch Craft Works",
        "Year": "2010",
        "ScanStatus": "Ongoing",
        "PublishStatus": "Ongoing",
        "Genres": ["Action", "Comedy", "Fantasy", "Romance", "School Life", "Seinen", "Supernatural"]
    }, {
        "IndexName": "Youkai-Shoujo-Monsuga",
        "SeriesName": "Youkai Shoujo - Monsuga",
        "Year": "2014",
        "ScanStatus": "Ongoing",
        "PublishStatus": "Complete",
        "Genres": ["Action", "Comedy", "Ecchi", "Harem", "Mature", "Romance", "Seinen", "Supernatural"]
    }, {
        "IndexName": "Boku-No-Hero-Academia-Smash",
        "SeriesName": "Boku no Hero Academia Smash!!",
        "Year": "2015",
        "ScanStatus": "Complete",
        "PublishStatus": "Complete",
        "Genres": ["Comedy", "Fantasy", "School Life", "Sci-fi", "Shounen"]
    }, {
        "IndexName": "Honzuki-No-Gekokujou",
        "SeriesName": "Honzuki no Gekokujou",
        "Year": "2015",
        "ScanStatus": "Complete",
        "PublishStatus": "Complete",
        "Genres": ["Fantasy", "Isekai", "Romance", "Shoujo", "Slice of Life"]
    }, {
        "IndexName": "Kono-Subarashii-Sekai-Ni-Bakuen-Wo",
        "SeriesName": "Kono Subarashii Sekai ni Bakuen wo!",
        "Year": "2014",
        "ScanStatus": "Complete",
        "PublishStatus": "Complete",
        "Genres": ["Adventure", "Comedy", "Ecchi", "Fantasy", "Seinen"]
    }, {
        "IndexName": "Chi-No-Wadachi",
        "SeriesName": "Chi no Wadachi",
        "Year": "2017",
        "ScanStatus": "Ongoing",
        "PublishStatus": "Ongoing",
        "Genres": ["Drama", "Psychological", "School Life", "Seinen", "Slice of Life"]
    }, {
        "IndexName": "Aono-kun-Ni-Sawaritai-Kara-Shinitai",
        "SeriesName": "Aono-kun ni Sawaritai kara Shinitai",
        "Year": "2016",
        "ScanStatus": "Ongoing",
        "PublishStatus": "Ongoing",
        "Genres": ["Romance", "School Life", "Seinen", "Slice of Life", "Supernatural"]
    }, {
        "IndexName": "S-rank-Monster-No-Behemoth-Dakedo",
        "SeriesName": "S-Rank Monster no Behemoth Dakedo",
        "Year": "2018",
        "ScanStatus": "Ongoing",
        "PublishStatus": "Ongoing",
        "Genres": ["Action", "Adventure", "Comedy", "Ecchi", "Fantasy", "Seinen"]
    }, {
        "IndexName": "Infinite-Dendrogram",
        "SeriesName": "Infinite Dendrogram",
        "Year": "2016",
        "ScanStatus": "Ongoing",
        "PublishStatus": "Ongoing",
        "Genres": ["Action", "Adventure", "Comedy", "Fantasy", "Romance", "Sci-fi"]
    }, {
        "IndexName": "Saihate-No-Paladin",
        "SeriesName": "Saihate no Paladin",
        "Year": "2017",
        "ScanStatus": "Ongoing",
        "PublishStatus": "Ongoing",
        "Genres": ["Action", "Adventure", "Fantasy", "Isekai"]
    }, {
        "IndexName": "MabuSasa",
        "SeriesName": "MabuSasa",
        "Year": "2018",
        "ScanStatus": "Complete",
        "PublishStatus": "Complete",
        "Genres": ["Comedy", "Romance", "School Life", "Shoujo"]
    }];
    vm.Recommendation = vm.Random(vm.RecommendationJSON);
    vm.HotUpdateJSON = [{
        "SeriesID": "4281",
        "IndexName": "Fairy-Tail-100-Years-Quest",
        "SeriesName": "Fairy Tail: 100 Years Quest",
        "Date": "2020-08-26T00:00:48+00:00",
        "Chapter": "100630",
        "IsEdd": false
    }, {
        "SeriesID": "4542",
        "IndexName": "The-Last-Human",
        "SeriesName": "The Last Human",
        "Date": "2020-08-25T21:45:44+00:00",
        "Chapter": "102620",
        "IsEdd": false
    }, {
        "SeriesID": "3824",
        "IndexName": "Komi-san-Wa-Komyushou-Desu",
        "SeriesName": "Komi-san wa Komyushou Desu.",
        "Date": "2020-08-25T17:56:07+00:00",
        "Chapter": "102640",
        "IsEdd": false
    }, {
        "SeriesID": "4027",
        "IndexName": "Kanojo-Okarishimasu",
        "SeriesName": "Kanojo, Okarishimasu",
        "Date": "2020-08-25T16:31:11+00:00",
        "Chapter": "101530",
        "IsEdd": false
    }, {
        "SeriesID": "5198",
        "IndexName": "Toorigakari-ni-One-Point-Advice-shite-iku-Type-no-Yankee",
        "SeriesName": "Toorigakari Ni One Point Advice Shiteiku Type No Yankee",
        "Date": "2020-08-25T15:14:18+00:00",
        "Chapter": "100380",
        "IsEdd": false
    }, {
        "SeriesID": "4379",
        "IndexName": "Martial-Peak",
        "SeriesName": "Martial Peak",
        "Date": "2020-08-25T15:12:57+00:00",
        "Chapter": "106510",
        "IsEdd": false
    }, {
        "SeriesID": "85",
        "IndexName": "Detective-Conan",
        "SeriesName": "Detective Conan",
        "Date": "2020-08-25T15:12:34+00:00",
        "Chapter": "110590",
        "IsEdd": false
    }, {
        "SeriesID": "4401",
        "IndexName": "A-Returners-Magic-Should-Be-Special",
        "SeriesName": "A Returner's Magic Should Be Special",
        "Date": "2020-08-25T15:11:39+00:00",
        "Chapter": "101170",
        "IsEdd": false
    }, {
        "SeriesID": "4815",
        "IndexName": "Weak-Hero",
        "SeriesName": "Weak Hero",
        "Date": "2020-08-25T03:23:05+00:00",
        "Chapter": "100980",
        "IsEdd": false
    }, {
        "SeriesID": "3361",
        "IndexName": "Fire-Brigade-Of-Flames",
        "SeriesName": "Fire Force",
        "Date": "2020-08-25T02:31:35+00:00",
        "Chapter": "102310",
        "IsEdd": false
    }, {
        "SeriesID": "4315",
        "IndexName": "Ijiranaide-Nagatoro-san",
        "SeriesName": "Ijiranaide, Nagatoro-san",
        "Date": "2020-08-25T00:41:08+00:00",
        "Chapter": "100660",
        "IsEdd": false
    }, {
        "SeriesID": "4052",
        "IndexName": "Beastars",
        "SeriesName": "Beastars",
        "Date": "2020-08-24T22:40:08+00:00",
        "Chapter": "101890",
        "IsEdd": false
    }, {
        "SeriesID": "42",
        "IndexName": "Vinland-Saga",
        "SeriesName": "Vinland Saga",
        "Date": "2020-08-24T21:13:41+00:00",
        "Chapter": "101750",
        "IsEdd": false
    }, {
        "SeriesID": "3170",
        "IndexName": "The-Legendary-Moonlight-Sculptor",
        "SeriesName": "The Legendary Moonlight Sculptor",
        "Date": "2020-08-24T19:38:54+00:00",
        "Chapter": "101490",
        "IsEdd": false
    }, {
        "SeriesID": "3573",
        "IndexName": "Kaguya-Wants-To-Be-Confessed-To",
        "SeriesName": "Kaguya-sama - Love Is War",
        "Date": "2020-08-24T18:01:56+00:00",
        "Chapter": "101990",
        "IsEdd": false
    }, {
        "SeriesID": "4833",
        "IndexName": "Hitoribocchi-no-Isekai-Kouryaku",
        "SeriesName": "Hitoribocchi no Isekai Kouryaku",
        "Date": "2020-08-23T23:17:33+00:00",
        "Chapter": "100330",
        "IsEdd": false
    }, {
        "SeriesID": "3897",
        "IndexName": "We-Never-Learn",
        "SeriesName": "We Never Learn",
        "Date": "2020-08-23T18:09:02+00:00",
        "Chapter": "101700",
        "IsEdd": false
    }, {
        "SeriesID": "4224",
        "IndexName": "Jujutsu-Kaisen",
        "SeriesName": "Jujutsu Kaisen",
        "Date": "2020-08-23T18:08:42+00:00",
        "Chapter": "101180",
        "IsEdd": false
    }, {
        "SeriesID": "3864",
        "IndexName": "Dr-Stone",
        "SeriesName": "Dr. Stone",
        "Date": "2020-08-23T18:08:24+00:00",
        "Chapter": "101620",
        "IsEdd": false
    }, {
        "SeriesID": "4504",
        "IndexName": "Chainsaw-Man",
        "SeriesName": "Chainsaw Man",
        "Date": "2020-08-23T18:08:13+00:00",
        "Chapter": "100810",
        "IsEdd": false
    }, {
        "SeriesID": "3205",
        "IndexName": "Black-Clover",
        "SeriesName": "Black Clover",
        "Date": "2020-08-23T18:08:06+00:00",
        "Chapter": "102610",
        "IsEdd": false
    }, {
        "SeriesID": "3983",
        "IndexName": "Mairimashita-Iruma-kun",
        "SeriesName": "Mairimashita! Iruma-kun",
        "Date": "2020-08-23T04:49:39+00:00",
        "Chapter": "101480",
        "IsEdd": false
    }, {
        "SeriesID": "3321",
        "IndexName": "Lookism",
        "SeriesName": "Lookism",
        "Date": "2020-08-23T03:03:21+00:00",
        "Chapter": "102970",
        "IsEdd": false
    }, {
        "SeriesID": "3465",
        "IndexName": "Gosu-The-Master",
        "SeriesName": "Gosu (The Master)",
        "Date": "2020-08-23T03:03:12+00:00",
        "Chapter": "201020",
        "IsEdd": false
    }, {
        "SeriesID": "4394",
        "IndexName": "The-Ghostly-Doctor",
        "SeriesName": "The Ghostly Doctor",
        "Date": "2020-08-22T19:21:14+00:00",
        "Chapter": "102650",
        "IsEdd": false
    }, {
        "SeriesID": "5175",
        "IndexName": "Isekai-Tensei-Saretenee",
        "SeriesName": "Isekai Tensei... Saretenee!",
        "Date": "2020-08-22T15:05:25+00:00",
        "Chapter": "100180",
        "IsEdd": false
    }, {
        "SeriesID": "4992",
        "IndexName": "The-Hero-Who-Returned-Remains-the-Strongest-in-the-Modern-World",
        "SeriesName": "The Hero Who Returned Remains the Strongest in the Modern World",
        "Date": "2020-08-22T07:59:56+00:00",
        "Chapter": "100111",
        "IsEdd": false
    }, {
        "SeriesID": "2280",
        "IndexName": "Red-Storm",
        "SeriesName": "Red Storm",
        "Date": "2020-08-22T07:59:18+00:00",
        "Chapter": "103760",
        "IsEdd": false
    }, {
        "SeriesID": "7",
        "IndexName": "One-Piece",
        "SeriesName": "One Piece",
        "Date": "2020-08-21T14:40:11+00:00",
        "Chapter": "109880",
        "IsEdd": false
    }, {
        "SeriesID": "4191",
        "IndexName": "Star-Martial-God-Technique",
        "SeriesName": "Star Martial God Technique",
        "Date": "2020-08-21T06:21:21+00:00",
        "Chapter": "103720",
        "IsEdd": false
    }, {
        "SeriesID": "157",
        "IndexName": "The-God-Of-High-School",
        "SeriesName": "The God of High School",
        "Date": "2020-08-21T03:07:05+00:00",
        "Chapter": "104760",
        "IsEdd": false
    }, {
        "SeriesID": "1689",
        "IndexName": "The-Gamer",
        "SeriesName": "The Gamer",
        "Date": "2020-08-21T03:06:56+00:00",
        "Chapter": "401460",
        "IsEdd": false
    }, {
        "SeriesID": "3571",
        "IndexName": "Hardcore-Leveling-Warrior",
        "SeriesName": "Hardcore Leveling Warrior",
        "Date": "2020-08-21T03:06:39+00:00",
        "Chapter": "200550",
        "IsEdd": false
    }, {
        "SeriesID": "2514",
        "IndexName": "G-T-O-Paradise-Lost",
        "SeriesName": "GTO - Paradise Lost",
        "Date": "2020-08-21T03:06:13+00:00",
        "Chapter": "101250",
        "IsEdd": false
    }, {
        "SeriesID": "4940",
        "IndexName": "The-100-Girlfriends-Who-Really-Really-Really-Really-Really-Love-You",
        "SeriesName": "The 100 Girlfriends Who Really, Really, Really, Really, Really Love You",
        "Date": "2020-08-20T22:42:27+00:00",
        "Chapter": "100280",
        "IsEdd": false
    }, {
        "SeriesID": "361",
        "IndexName": "Kingdom",
        "SeriesName": "Kingdom",
        "Date": "2020-08-20T19:49:00+00:00",
        "Chapter": "106500",
        "IsEdd": false
    }, {
        "SeriesID": "3541",
        "IndexName": "Boruto",
        "SeriesName": "Boruto",
        "Date": "2020-08-20T17:04:59+00:00",
        "Chapter": "100490",
        "IsEdd": false
    }, {
        "SeriesID": "4522",
        "IndexName": "Kengan-Omega",
        "SeriesName": "Kengan Omega",
        "Date": "2020-08-20T15:17:58+00:00",
        "Chapter": "100730",
        "IsEdd": false
    }, {
        "SeriesID": "153",
        "IndexName": "Onepunch-Man",
        "SeriesName": "One-Punch Man",
        "Date": "2020-08-20T06:33:11+00:00",
        "Chapter": "101045",
        "IsEdd": false
    }, {
        "SeriesID": "4396",
        "IndexName": "Tokyo-Revengers",
        "SeriesName": "Toukyou Revengers",
        "Date": "2020-08-19T21:04:40+00:00",
        "Chapter": "101700",
        "IsEdd": false
    }, {
        "SeriesID": "4446",
        "IndexName": "Solo-Leveling",
        "SeriesName": "Solo Leveling",
        "Date": "2020-08-19T19:22:41+00:00",
        "Chapter": "101150",
        "IsEdd": false
    }, {
        "SeriesID": "4921",
        "IndexName": "Kakkou-no-Iinazuke",
        "SeriesName": "Kakkou no Iinazuke",
        "Date": "2020-08-19T15:28:35+00:00",
        "Chapter": "100280",
        "IsEdd": false
    }, {
        "SeriesID": "4485",
        "IndexName": "Ore-No-Ie-Ga-Maryoku-Spot-Datta-Ken",
        "SeriesName": "Ore no Ie ga Maryoku Spot datta Ken - Sundeiru dake de Sekai Saikyou",
        "Date": "2020-08-18T20:34:19+00:00",
        "Chapter": "100470",
        "IsEdd": false
    }, {
        "SeriesID": "3356",
        "IndexName": "Battle-Through-The-Heavens",
        "SeriesName": "Battle Through The Heavens",
        "Date": "2020-08-18T19:42:57+00:00",
        "Chapter": "103050",
        "IsEdd": false
    }, {
        "SeriesID": "89",
        "IndexName": "Hajime-No-Ippo",
        "SeriesName": "Hajime no Ippo",
        "Date": "2020-08-18T15:13:18+00:00",
        "Chapter": "113100",
        "IsEdd": false
    }, {
        "SeriesID": "4031",
        "IndexName": "Makikomarete-Isekai-Teni-Suru-Yatsu-Wa-Taitei-Cheat",
        "SeriesName": "Makikomarete Isekai Teni suru Yatsu wa, Taitei Cheat",
        "Date": "2020-08-17T18:49:10+00:00",
        "Chapter": "100291",
        "IsEdd": false
    }, {
        "SeriesID": "4650",
        "IndexName": "Uzaki-chan-Wa-Asobitai",
        "SeriesName": "Uzaki-chan wa Asobitai!",
        "Date": "2020-08-15T06:11:18+00:00",
        "Chapter": "100540",
        "IsEdd": false
    }, {
        "SeriesID": "4044",
        "IndexName": "The-Duke-Of-Death-And-His-Black-Maid",
        "SeriesName": "The Duke of Death and his Black Maid",
        "Date": "2020-08-14T21:17:08+00:00",
        "Chapter": "101420",
        "IsEdd": false
    }, {
        "SeriesID": "3923",
        "IndexName": "Parallel-Paradise",
        "SeriesName": "Parallel Paradise",
        "Date": "2020-08-14T15:08:56+00:00",
        "Chapter": "101080",
        "IsEdd": false
    }, {
        "SeriesID": "4263",
        "IndexName": "Gokushufudou-The-Way-Of-The-House-Husband",
        "SeriesName": "Gokushufudou: The Way of the House Husband",
        "Date": "2020-08-14T15:08:17+00:00",
        "Chapter": "100560",
        "IsEdd": false
    }, {
        "SeriesID": "3669",
        "IndexName": "Isekai-Maou-To-Shoukan-Shoujo-Dorei-Majutsu",
        "SeriesName": "Isekai Maou to Shoukan Shoujo Dorei Majutsu",
        "Date": "2020-08-12T15:19:03+00:00",
        "Chapter": "100602",
        "IsEdd": false
    }, {
        "SeriesID": "3644",
        "IndexName": "Worlds-End-Harem",
        "SeriesName": "World's End Harem",
        "Date": "2020-08-12T04:51:02+00:00",
        "Chapter": "100820",
        "IsEdd": false
    }, {
        "SeriesID": "3875",
        "IndexName": "Jagaaaaaan",
        "SeriesName": "Jagaaaaaan",
        "Date": "2020-08-12T03:17:50+00:00",
        "Chapter": "101130",
        "IsEdd": false
    }, {
        "SeriesID": "4100",
        "IndexName": "Act-Age",
        "SeriesName": "Act-Age",
        "Date": "2020-08-11T04:44:04+00:00",
        "Chapter": "101230",
        "IsEdd": false
    }, {
        "SeriesID": "3420",
        "IndexName": "Golden-Kamui",
        "SeriesName": "Golden Kamui",
        "Date": "2020-08-10T05:16:53+00:00",
        "Chapter": "102490",
        "IsEdd": false
    }, {
        "SeriesID": "4663",
        "IndexName": "Spy-X-Family",
        "SeriesName": "Spy X Family",
        "Date": "2020-08-09T17:10:26+00:00",
        "Chapter": "100310",
        "IsEdd": false
    }, {
        "SeriesID": "3724",
        "IndexName": "Grand-Blue",
        "SeriesName": "Grand Blue",
        "Date": "2020-08-08T17:00:31+00:00",
        "Chapter": "100625",
        "IsEdd": false
    }, {
        "SeriesID": "219",
        "IndexName": "Horimiya",
        "SeriesName": "Horimiya",
        "Date": "2020-08-08T15:18:40+00:00",
        "Chapter": "101170",
        "IsEdd": false
    }, {
        "SeriesID": "266",
        "IndexName": "Nanatsu-No-Taizai",
        "SeriesName": "Nanatsu no Taizai",
        "Date": "2020-08-05T04:07:09+00:00",
        "Chapter": "103465",
        "IsEdd": false
    }, {
        "SeriesID": "155",
        "IndexName": "Shingeki-No-Kyojin",
        "SeriesName": "Shingeki no Kyojin",
        "Date": "2020-08-04T21:24:21+00:00",
        "Chapter": "101310",
        "IsEdd": false
    }, {
        "SeriesID": "151",
        "IndexName": "Minamoto-Kun-Monogatari",
        "SeriesName": "Minamoto-kun Monogatari",
        "Date": "2020-07-31T17:13:11+00:00",
        "Chapter": "103580",
        "IsEdd": false
    }, {
        "SeriesID": "4166",
        "IndexName": "Isekai-Meikyuu-De-Harem-O",
        "SeriesName": "Isekai Meikyuu de Harem o",
        "Date": "2020-07-29T00:40:52+00:00",
        "Chapter": "100390",
        "IsEdd": false
    }, {
        "SeriesID": "3426",
        "IndexName": "Its-Difficult-To-Love-An-Otaku",
        "SeriesName": "It's Difficult to Love an Otaku",
        "Date": "2020-07-28T16:26:37+00:00",
        "Chapter": "100530",
        "IsEdd": false
    }, {
        "SeriesID": "2369",
        "IndexName": "Baki-Dou",
        "SeriesName": "Baki-Dou",
        "Date": "2020-07-27T15:14:09+00:00",
        "Chapter": "101970",
        "IsEdd": false
    }, {
        "SeriesID": "3378",
        "IndexName": "Tensei-Shitara-Slime-Datta-Ken",
        "SeriesName": "Tensei Shitara Slime Datta Ken",
        "Date": "2020-07-27T03:56:11+00:00",
        "Chapter": "100730",
        "IsEdd": false
    }, {
        "SeriesID": "4117",
        "IndexName": "Nande-Koko-Ni-Sensei-Ga",
        "SeriesName": "Nande koko ni sensei ga!?",
        "Date": "2020-07-24T21:47:44+00:00",
        "Chapter": "100880",
        "IsEdd": false
    }, {
        "SeriesID": "12",
        "IndexName": "Berserk",
        "SeriesName": "Berserk",
        "Date": "2020-07-23T00:09:50+00:00",
        "Chapter": "203610",
        "IsEdd": false
    }, {
        "SeriesID": "3661",
        "IndexName": "Goblin-Slayer",
        "SeriesName": "Goblin Slayer",
        "Date": "2020-07-22T22:31:21+00:00",
        "Chapter": "100500",
        "IsEdd": false
    }, {
        "SeriesID": "288",
        "IndexName": "Haikyu",
        "SeriesName": "Haikyu!!",
        "Date": "2020-07-19T18:14:47+00:00",
        "Chapter": "104020",
        "IsEdd": false
    }, {
        "SeriesID": "4557",
        "IndexName": "Desuraba",
        "SeriesName": "Desuraba",
        "Date": "2020-07-02T15:25:55+00:00",
        "Chapter": "100120",
        "IsEdd": false
    }, {
        "SeriesID": "158",
        "IndexName": "Tower-Of-God",
        "SeriesName": "Tower of God",
        "Date": "2020-06-29T07:48:18+00:00",
        "Chapter": "300680",
        "IsEdd": false
    }, {
        "SeriesID": "3701",
        "IndexName": "The-Promised-Neverland",
        "SeriesName": "The Promised Neverland",
        "Date": "2020-06-14T18:20:00+00:00",
        "Chapter": "101810",
        "IsEdd": false
    }, {
        "SeriesID": "3081",
        "IndexName": "Domestic-Na-Kanojo",
        "SeriesName": "Domestic na Kanojo",
        "Date": "2020-06-09T01:13:42+00:00",
        "Chapter": "102760",
        "IsEdd": false
    }, {
        "SeriesID": "3575",
        "IndexName": "Kimetsu-No-Yaiba",
        "SeriesName": "Kimetsu no Yaiba",
        "Date": "2020-05-17T18:18:17+00:00",
        "Chapter": "102050",
        "IsEdd": false
    }, {
        "SeriesID": "2772",
        "IndexName": "One-Piece-Digital-Colored-Comics",
        "SeriesName": "One Piece - Digital Colored Comics",
        "Date": "2020-02-20T18:17:56+00:00",
        "Chapter": "108590",
        "IsEdd": false
    }, {
        "SeriesID": "3235",
        "IndexName": "Re-L-I-F-E",
        "SeriesName": "ReLIFE",
        "Date": "2020-02-20T15:08:42+00:00",
        "Chapter": "102225",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2020-01-02T17:11:26+00:00",
        "Chapter": "102365",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2019-10-17T16:29:58+00:00",
        "Chapter": "101885",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2019-09-12T16:02:27+00:00",
        "Chapter": "101645",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2019-07-18T14:55:53+00:00",
        "Chapter": "101405",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2019-01-08T17:52:35+00:00",
        "Chapter": "102360",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2019-01-07T17:42:51+00:00",
        "Chapter": "102350",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2019-01-06T16:55:33+00:00",
        "Chapter": "102340",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2019-01-05T18:15:59+00:00",
        "Chapter": "102330",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2019-01-04T17:26:32+00:00",
        "Chapter": "102320",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2019-01-03T17:07:30+00:00",
        "Chapter": "102310",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2019-01-02T17:14:29+00:00",
        "Chapter": "102300",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2019-01-01T15:27:15+00:00",
        "Chapter": "102290",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-31T16:55:57+00:00",
        "Chapter": "102280",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-30T16:53:05+00:00",
        "Chapter": "102270",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-29T16:34:53+00:00",
        "Chapter": "102260",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-28T18:33:38+00:00",
        "Chapter": "102250",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-27T17:07:01+00:00",
        "Chapter": "102240",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-26T15:17:01+00:00",
        "Chapter": "102230",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-25T16:53:38+00:00",
        "Chapter": "102220",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-24T17:15:17+00:00",
        "Chapter": "102210",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-23T16:52:48+00:00",
        "Chapter": "102200",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-22T17:03:15+00:00",
        "Chapter": "102190",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-21T17:13:43+00:00",
        "Chapter": "102180",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-20T16:42:58+00:00",
        "Chapter": "102170",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-19T16:59:21+00:00",
        "Chapter": "102160",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-18T17:09:17+00:00",
        "Chapter": "102150",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-17T16:43:31+00:00",
        "Chapter": "102140",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-16T17:15:51+00:00",
        "Chapter": "102130",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-15T16:58:52+00:00",
        "Chapter": "102120",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-14T17:48:56+00:00",
        "Chapter": "102110",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-13T17:13:28+00:00",
        "Chapter": "102100",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-12T16:23:33+00:00",
        "Chapter": "102090",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-11T17:21:48+00:00",
        "Chapter": "102080",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-10T17:22:12+00:00",
        "Chapter": "102070",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-09T17:29:58+00:00",
        "Chapter": "102060",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-08T16:54:50+00:00",
        "Chapter": "102050",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-07T16:51:12+00:00",
        "Chapter": "102040",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-06T17:51:35+00:00",
        "Chapter": "102030",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-05T17:17:45+00:00",
        "Chapter": "102020",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-04T16:42:33+00:00",
        "Chapter": "102010",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-03T16:15:31+00:00",
        "Chapter": "102000",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-02T16:38:29+00:00",
        "Chapter": "101990",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-12-01T17:05:25+00:00",
        "Chapter": "101980",
        "IsEdd": false
    }, {
        "SeriesID": "3276",
        "IndexName": "Kengan-Asura",
        "SeriesName": "Kengan Asura",
        "Date": "2018-11-30T16:21:15+00:00",
        "Chapter": "101970",
        "IsEdd": false
    }];
    vm.LatestJSON = [{
        "SeriesID": "4439",
        "IndexName": "Potion-danomi-De-Ikinobimasu",
        "SeriesName": "Potion-danomi de Ikinobimasu!",
        "ScanStatus": "Ongoing",
        "Chapter": "100311",
        "Genres": "Adventure, Comedy, Fantasy, Isekai, Shounen",
        "Date": "2020-08-26T00:45:41+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4242",
        "IndexName": "Soukyuu-No-Ariadne",
        "SeriesName": "Soukyuu no Ariadne",
        "ScanStatus": "Ongoing",
        "Chapter": "101110",
        "Genres": "Action, Adventure, Comedy, Drama, Sci-fi, Shounen",
        "Date": "2020-08-26T00:00:54+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4281",
        "IndexName": "Fairy-Tail-100-Years-Quest",
        "SeriesName": "Fairy Tail: 100 Years Quest",
        "ScanStatus": "Ongoing",
        "Chapter": "100630",
        "Genres": "Action, Adventure, Comedy, Drama, Ecchi, Fantasy, Shounen",
        "Date": "2020-08-26T00:00:48+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3119",
        "IndexName": "Bungo-Stray-Dogs",
        "SeriesName": "Bungo Stray Dogs",
        "ScanStatus": "Ongoing",
        "Chapter": "100845",
        "Genres": "Action, Drama, Mystery, Seinen, Supernatural",
        "Date": "2020-08-26T00:00:26+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5244",
        "IndexName": "The-Reincarnated-Inferior-Magic-Swordsman",
        "SeriesName": "The Reincarnated Inferior Magic Swordsman",
        "ScanStatus": "Ongoing",
        "Chapter": "100080",
        "Genres": "Adventure, Fantasy, Shounen, Slice of Life",
        "Date": "2020-08-25T22:56:03+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4546",
        "IndexName": "Yondome-Wa-Iyana-Shi-Zokusei-Majutsushi",
        "SeriesName": "Yondome wa Iyana Shi Zokusei Majutsushi",
        "ScanStatus": "Ongoing",
        "Chapter": "100190",
        "Genres": "Action, Adventure, Comedy, Drama, Ecchi, Fantasy, Harem, Isekai, Shounen",
        "Date": "2020-08-25T22:31:10+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4794",
        "IndexName": "Saikyou-no-Shuzoku-ga-Ningen-Datta-Ken",
        "SeriesName": "Saikyou no Shuzoku ga Ningen datta Ken",
        "ScanStatus": "Ongoing",
        "Chapter": "100400",
        "Genres": "Action, Adult, Adventure, Comedy, Ecchi, Fantasy, Harem, Seinen",
        "Date": "2020-08-25T22:31:03+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "499",
        "IndexName": "Usogui",
        "SeriesName": "Usogui",
        "ScanStatus": "Ongoing",
        "Chapter": "105070",
        "Genres": "Action, Mystery, Psychological, Seinen",
        "Date": "2020-08-25T21:45:52+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4542",
        "IndexName": "The-Last-Human",
        "SeriesName": "The Last Human",
        "ScanStatus": "Ongoing",
        "Chapter": "102620",
        "Genres": "Action, Adventure, Comedy, Drama, Ecchi, Horror, Mystery, Shounen, Supernatural",
        "Date": "2020-08-25T21:45:44+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3275",
        "IndexName": "Himekishi-Ga-Classmate",
        "SeriesName": "Himekishi ga Classmate!",
        "ScanStatus": "Ongoing",
        "Chapter": "100340",
        "Genres": "Action, Adult, Drama, Fantasy, Harem, Isekai, Mature, Seinen",
        "Date": "2020-08-25T21:45:35+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4502",
        "IndexName": "Ao-Ashi",
        "SeriesName": "Ao Ashi",
        "ScanStatus": "Ongoing",
        "Chapter": "101000",
        "Genres": "School Life, Seinen, Sports",
        "Date": "2020-08-25T21:45:27+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "212",
        "IndexName": "Kubera",
        "SeriesName": "Kubera",
        "ScanStatus": "Ongoing",
        "Chapter": "301605",
        "Genres": "Action, Adventure, Comedy, Fantasy, Romance, Shounen",
        "Date": "2020-08-25T20:55:03+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5369",
        "IndexName": "The-Former-Structural-Analysts-Otherworldly-Adventure-Story",
        "SeriesName": "The Former Structural Analyst's Otherworldly Adventure Story",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Action, Adventure, Fantasy, Isekai, Shounen, Slice of Life",
        "Date": "2020-08-25T20:18:42+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5368",
        "IndexName": "The-Child-Loved-by-God",
        "SeriesName": "The Child Loved by God",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Fantasy, Isekai, Shounen, Slice of Life, Supernatural",
        "Date": "2020-08-25T20:18:28+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5367",
        "IndexName": "Tenshoku-no-Shinden-o-Hirakimashita",
        "SeriesName": "Tenshoku no Shinden wo Hirakimashita",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Action, Adventure, Fantasy, Isekai",
        "Date": "2020-08-25T20:18:16+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5366",
        "IndexName": "Tensei-Kusushi-wa-Isekai-wo-Meguru",
        "SeriesName": "Tensei Kusushi wa Isekai wo Meguru",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Adventure, Comedy, Fantasy, Isekai, Mystery, Slice of Life, Supernatural",
        "Date": "2020-08-25T20:18:02+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5365",
        "IndexName": "Shoukan-sareta-Kenja-wa-Isekai-wo-Yuku",
        "SeriesName": "Shoukan sareta Kenja wa Isekai wo Yuku",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Action, Adventure, Comedy, Drama, Fantasy, Harem, Isekai, Martial Arts, Seinen, Supernatural",
        "Date": "2020-08-25T20:17:49+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5364",
        "IndexName": "Shishunki-chan-no-Shitsukekata",
        "SeriesName": "Shishunki-chan no Shitsukekata",
        "ScanStatus": "Ongoing",
        "Chapter": "100000",
        "Genres": "Adult, Comedy, Ecchi, Romance, School Life, Shounen",
        "Date": "2020-08-25T20:17:35+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5363",
        "IndexName": "Shikkoku-Tsukai-no-Saikyou-Yuusha",
        "SeriesName": "Shikkoku Tsukai No Saikyou Yuusha",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Action, Adventure, Comedy, Ecchi, Fantasy, Romance, Shounen, Supernatural",
        "Date": "2020-08-25T20:17:19+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5362",
        "IndexName": "Shijou-Saikyou-no-Daimaou-Murabito-A-ni-Tensei-suru",
        "SeriesName": "Shijou Saikyou no Daimaou, Murabito A ni Tensei suru",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Comedy, Fantasy, Harem, Isekai, Seinen, Slice of Life",
        "Date": "2020-08-25T20:17:06+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5361",
        "IndexName": "Seiken-Gakuin-no-Maken-Tsukai",
        "SeriesName": "Seiken Gakuin no Maken Tsukai",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Action, Comedy, Ecchi, Fantasy, Romance, School Life, Shounen",
        "Date": "2020-08-25T20:16:53+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5360",
        "IndexName": "Samayoeru-Tensei-shatachi-no-Relive-Game",
        "SeriesName": "Samayoeru Tensei-sha-tachi no Relive Game",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Adventure, Ecchi, Fantasy, Gender Bender, Shounen",
        "Date": "2020-08-25T20:16:38+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "461",
        "IndexName": "Buster-Keel",
        "SeriesName": "Buster Keel!",
        "ScanStatus": "Ongoing",
        "Chapter": "100310",
        "Genres": "Action, Adventure, Comedy, Fantasy, Shounen",
        "Date": "2020-08-25T19:47:51+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3824",
        "IndexName": "Komi-san-Wa-Komyushou-Desu",
        "SeriesName": "Komi-san wa Komyushou Desu.",
        "ScanStatus": "Ongoing",
        "Chapter": "102640",
        "Genres": "Comedy, Romance, School Life, Shounen, Slice of Life",
        "Date": "2020-08-25T17:56:07+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4227",
        "IndexName": "Karakai-Jouzu-No-moto-Takagi-san",
        "SeriesName": "Karakai Jouzu no (Moto) Takagi-san",
        "ScanStatus": "Ongoing",
        "Chapter": "101490",
        "Genres": "Comedy, Romance, Shounen, Slice of Life",
        "Date": "2020-08-25T17:44:34+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4389",
        "IndexName": "Sono-Bisque-Doll-Wa-Koi-Wo-Suru",
        "SeriesName": "Sono Bisque Doll wa Koi wo suru",
        "ScanStatus": "Ongoing",
        "Chapter": "100450",
        "Genres": "Comedy, Ecchi, Romance, School Life, Seinen",
        "Date": "2020-08-25T17:35:19+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5140",
        "IndexName": "Sousou-no-Frieren",
        "SeriesName": "Sousou no Frieren",
        "ScanStatus": "Ongoing",
        "Chapter": "100150",
        "Genres": "Adventure, Drama, Fantasy, Shounen, Slice of Life",
        "Date": "2020-08-25T17:29:18+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5178",
        "IndexName": "Kanojo-mo-Kanojo",
        "SeriesName": "Kanojo mo Kanojo",
        "ScanStatus": "Ongoing",
        "Chapter": "100240",
        "Genres": "Comedy, Harem, Romance, School Life, Shounen, Slice of Life",
        "Date": "2020-08-25T17:29:13+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5147",
        "IndexName": "Tou-no-Kanri-o-Shite-Miyou",
        "SeriesName": "Tou no Kanri o Shite Miyou",
        "ScanStatus": "Ongoing",
        "Chapter": "100240",
        "Genres": "Action, Adventure, Ecchi, Fantasy, Harem, Isekai, Mature, Romance, Shounen",
        "Date": "2020-08-25T16:34:12+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4337",
        "IndexName": "Slime-Taoshite-300-nen-Shiranai-Uchi-Ni-Level-Max-Ni-Nattemashita",
        "SeriesName": "Slime Taoshite 300-nen, Shiranai Uchi ni Level MAX ni Natteshimatta",
        "ScanStatus": "Ongoing",
        "Chapter": "100250",
        "Genres": "Adventure, Comedy, Fantasy, Isekai, Shounen, Slice of Life",
        "Date": "2020-08-25T16:31:30+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4120",
        "IndexName": "Oroka-Na-Tenshi-Wa-Akuma-To-Odoru",
        "SeriesName": "Oroka na Tenshi wa Akuma to Odoru",
        "ScanStatus": "Ongoing",
        "Chapter": "100460",
        "Genres": "Action, Comedy, Ecchi, Romance, School Life, Seinen, Supernatural",
        "Date": "2020-08-25T16:31:22+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4027",
        "IndexName": "Kanojo-Okarishimasu",
        "SeriesName": "Kanojo, Okarishimasu",
        "ScanStatus": "Ongoing",
        "Chapter": "101530",
        "Genres": "Comedy, Ecchi, Harem, Romance, School Life, Shounen, Slice of Life",
        "Date": "2020-08-25T16:31:11+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "224",
        "IndexName": "Diamond-No-Ace",
        "SeriesName": "Diamond no Ace",
        "ScanStatus": "Ongoing",
        "Chapter": "104110",
        "Genres": "Comedy, School Life, Shounen, Sports",
        "Date": "2020-08-25T16:31:03+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4748",
        "IndexName": "The-World-Of-Moral-Reversal",
        "SeriesName": "The World of Moral Reversal",
        "ScanStatus": "Ongoing",
        "Chapter": "100230",
        "Genres": "Comedy, Ecchi, Fantasy, Mature, School Life, Seinen",
        "Date": "2020-08-25T15:32:31+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5160",
        "IndexName": "Weathering-with-You",
        "SeriesName": "Weathering with You",
        "ScanStatus": "Ongoing",
        "Chapter": "100130",
        "Genres": "Drama, Romance, Seinen, Slice of Life, Supernatural",
        "Date": "2020-08-25T15:14:35+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "190",
        "IndexName": "Trinity-Seven",
        "SeriesName": "Trinity Seven: 7-Nin no Mahoutsukai",
        "ScanStatus": "Ongoing",
        "Chapter": "100950",
        "Genres": "Action, Comedy, Ecchi, Fantasy, Harem, Mystery, Romance, School Life, Shounen, Supernatural",
        "Date": "2020-08-25T15:14:25+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5198",
        "IndexName": "Toorigakari-ni-One-Point-Advice-shite-iku-Type-no-Yankee",
        "SeriesName": "Toorigakari Ni One Point Advice Shiteiku Type No Yankee",
        "ScanStatus": "Ongoing",
        "Chapter": "100380",
        "Genres": "Comedy, Romance, Seinen, Slice of Life",
        "Date": "2020-08-25T15:14:18+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5195",
        "IndexName": "Tendou-ke-Monogatari",
        "SeriesName": "Tendou-ke Monogatari",
        "ScanStatus": "Ongoing",
        "Chapter": "100310",
        "Genres": "Drama, Historical, Psychological, Romance, Shoujo",
        "Date": "2020-08-25T15:14:11+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5194",
        "IndexName": "Sunoharasou-no-Kanrinin-san",
        "SeriesName": "Sunoharasou no Kanrinin-san",
        "ScanStatus": "Ongoing",
        "Chapter": "100465",
        "Genres": "Comedy, Ecchi, Harem, Romance, Seinen, Slice of Life",
        "Date": "2020-08-25T15:13:38+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4893",
        "IndexName": "Soredemo-Ayumu-wa-Yosetekuru",
        "SeriesName": "Soredemo Ayumu wa Yosetekuru",
        "ScanStatus": "Ongoing",
        "Chapter": "100710",
        "Genres": "Comedy, Romance, School Life, Shounen, Slice of Life",
        "Date": "2020-08-25T15:13:27+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5237",
        "IndexName": "Ryuu-to-Ryuugoroshi-no-Fujo",
        "SeriesName": "Ryuu to Ryuugoroshi no Fujo",
        "ScanStatus": "Ongoing",
        "Chapter": "100090",
        "Genres": "Adventure, Comedy, Fantasy, Romance, Shounen",
        "Date": "2020-08-25T15:13:19+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4331",
        "IndexName": "Pashiri-Na-Boku-To-Koisuru-Banchou",
        "SeriesName": "Pashiri na Boku to Koi suru Banchou-san",
        "ScanStatus": "Ongoing",
        "Chapter": "100670",
        "Genres": "Comedy, Romance, School Life, Seinen, Slice of Life",
        "Date": "2020-08-25T15:13:13+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3676",
        "IndexName": "Murenase-Shiiton-Gakuen",
        "SeriesName": "Murenase! Shiiton Gakuen",
        "ScanStatus": "Ongoing",
        "Chapter": "101240",
        "Genres": "Comedy, Romance, School Life, Shounen",
        "Date": "2020-08-25T15:13:04+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4379",
        "IndexName": "Martial-Peak",
        "SeriesName": "Martial Peak",
        "ScanStatus": "Ongoing",
        "Chapter": "106510",
        "Genres": "Action, Adventure, Comedy, Fantasy, Harem, Historical, Martial Arts, Romance, Shounen, Supernatural",
        "Date": "2020-08-25T15:12:57+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4738",
        "IndexName": "Isekai-Ojisan",
        "SeriesName": "Isekai Ojisan",
        "ScanStatus": "Ongoing",
        "Chapter": "100240",
        "Genres": "Comedy, Fantasy, Isekai, Seinen, Slice of Life",
        "Date": "2020-08-25T15:12:47+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5349",
        "IndexName": "Ichioku-nen-Button-o-Renda-Shita-Ore-wa-Kizuitara-Saikyou-ni-Natteita",
        "SeriesName": "Ichioku-nen Button o Renda Shita Ore wa, Kizuitara Saikyou ni Natteita",
        "ScanStatus": "Ongoing",
        "Chapter": "100051",
        "Genres": "Action, Adventure, Fantasy, Harem, School Life",
        "Date": "2020-08-25T15:12:41+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "85",
        "IndexName": "Detective-Conan",
        "SeriesName": "Detective Conan",
        "ScanStatus": "Ongoing",
        "Chapter": "110590",
        "Genres": "Adventure, Comedy, Mystery, Romance, School Life, Shounen",
        "Date": "2020-08-25T15:12:34+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3120",
        "IndexName": "Dagashi-Kashi",
        "SeriesName": "Dagashi Kashi",
        "ScanStatus": "Ongoing",
        "Chapter": "101660",
        "Genres": "Comedy, Romance, Shounen, Slice of Life",
        "Date": "2020-08-25T15:12:25+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "378",
        "IndexName": "Bokura-No-Kiseki",
        "SeriesName": "Bokura no Kiseki",
        "ScanStatus": "Ongoing",
        "Chapter": "101010",
        "Genres": "Action, Fantasy, Gender Bender, Mystery, Romance, School Life, Shoujo, Supernatural",
        "Date": "2020-08-25T15:12:17+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5355",
        "IndexName": "Kekkon-Surutte-Hontou-desu-ka-365-Days-to-the-Wedding",
        "SeriesName": "Kekkon Surutte, Hontou desu ka?: 365 Days to the Wedding",
        "ScanStatus": "Ongoing",
        "Chapter": "100150",
        "Genres": "Romance, Seinen, Slice of Life",
        "Date": "2020-08-25T15:12:10+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4768",
        "IndexName": "Akebi-chan-no-Sailor-Fuku",
        "SeriesName": "Akebi-chan no Sailor Fuku",
        "ScanStatus": "Ongoing",
        "Chapter": "100335",
        "Genres": "Comedy, Ecchi, School Life, Seinen, Slice of Life",
        "Date": "2020-08-25T15:11:47+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4401",
        "IndexName": "A-Returners-Magic-Should-Be-Special",
        "SeriesName": "A Returner's Magic Should Be Special",
        "ScanStatus": "Ongoing",
        "Chapter": "101170",
        "Genres": "Action, Adventure, Comedy, Fantasy, Martial Arts, School Life, Shounen",
        "Date": "2020-08-25T15:11:39+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4540",
        "IndexName": "Tengoku-Daimakyou",
        "SeriesName": "Tengoku Daimakyou",
        "ScanStatus": "Ongoing",
        "Chapter": "100290",
        "Genres": "Adventure, Mystery, Romance, Sci-fi, Seinen, Tragedy",
        "Date": "2020-08-25T05:05:13+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4971",
        "IndexName": "Kou-2-ni-Time-Leaped-Shita-Ore-ga-Touji-suki-Datta-Sensei-ni-Kokutta-Kekka",
        "SeriesName": "Kou 2 ni Time Leaped Shita Ore ga, Touji suki Datta Sensei ni Kokutta Kekka",
        "ScanStatus": "Ongoing",
        "Chapter": "100280",
        "Genres": "Comedy, Romance, School Life, Shounen, Supernatural",
        "Date": "2020-08-25T05:05:04+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4606",
        "IndexName": "Burning-Effect",
        "SeriesName": "Burning Effect",
        "ScanStatus": "Ongoing",
        "Chapter": "101240",
        "Genres": "Action, Adventure, Drama, Ecchi, Martial Arts, Mature, Sci-fi, Supernatural",
        "Date": "2020-08-25T05:04:41+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4816",
        "IndexName": "Zero-Game",
        "SeriesName": "Zero Game",
        "ScanStatus": "Ongoing",
        "Chapter": "100510",
        "Genres": "Action, Drama, Fantasy, Romance",
        "Date": "2020-08-25T03:23:16+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4815",
        "IndexName": "Weak-Hero",
        "SeriesName": "Weak Hero",
        "ScanStatus": "Ongoing",
        "Chapter": "100980",
        "Genres": "Action, Drama, School Life, Shounen",
        "Date": "2020-08-25T03:23:05+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4812",
        "IndexName": "Spirit-Fingers",
        "SeriesName": "Spirit Fingers",
        "ScanStatus": "Ongoing",
        "Chapter": "101290",
        "Genres": "Comedy, Romance, Shoujo, Slice of Life",
        "Date": "2020-08-25T03:22:56+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4811",
        "IndexName": "Scorching-Romance",
        "SeriesName": "Scorching Romance",
        "ScanStatus": "Ongoing",
        "Chapter": "100630",
        "Genres": "Comedy, Romance, School Life",
        "Date": "2020-08-25T03:22:49+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4809",
        "IndexName": "Odd-Girl-Out",
        "SeriesName": "Odd Girl Out",
        "ScanStatus": "Ongoing",
        "Chapter": "102200",
        "Genres": "Comedy, School Life, Shoujo, Slice of Life",
        "Date": "2020-08-25T03:22:41+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4807",
        "IndexName": "My-Deepest-Secret",
        "SeriesName": "My Deepest Secret",
        "ScanStatus": "Ongoing",
        "Chapter": "100580",
        "Genres": "Drama, Josei, Romance",
        "Date": "2020-08-25T03:22:26+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4805",
        "IndexName": "Eleceed",
        "SeriesName": "Eleceed",
        "ScanStatus": "Ongoing",
        "Chapter": "100710",
        "Genres": "Action, Comedy, Shounen, Supernatural",
        "Date": "2020-08-25T03:22:15+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4645",
        "IndexName": "Peerless-Dad",
        "SeriesName": "Peerless Dad",
        "ScanStatus": "Ongoing",
        "Chapter": "101370",
        "Genres": "Action, Adventure, Comedy, Drama, Fantasy, Martial Arts, Slice of Life",
        "Date": "2020-08-25T02:38:06+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3361",
        "IndexName": "Fire-Brigade-Of-Flames",
        "SeriesName": "Fire Force",
        "ScanStatus": "Ongoing",
        "Chapter": "102310",
        "Genres": "Action, Comedy, Drama, Ecchi, Shounen, Supernatural",
        "Date": "2020-08-25T02:31:35+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "268",
        "IndexName": "New-Prince-Of-Tennis",
        "SeriesName": "New Prince of Tennis",
        "ScanStatus": "Ongoing",
        "Chapter": "103070",
        "Genres": "Comedy, Drama, School Life, Shounen, Sports",
        "Date": "2020-08-25T02:09:50+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "544",
        "IndexName": "Cyclops-Shoujo-Saipu",
        "SeriesName": "Cyclops Shoujo Saipu",
        "ScanStatus": "Ongoing",
        "Chapter": "100980",
        "Genres": "Comedy, Ecchi, Romance, School Life, Seinen, Slice of Life",
        "Date": "2020-08-25T02:09:39+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5325",
        "IndexName": "The-Kings-Avatar-Reboot",
        "SeriesName": "The King's Avatar (Reboot)",
        "ScanStatus": "Ongoing",
        "Chapter": "100030",
        "Genres": "Action, Adventure, Comedy, Seinen, Slice of Life",
        "Date": "2020-08-25T02:09:17+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "561",
        "IndexName": "L-I-F-E",
        "SeriesName": "LIFE",
        "ScanStatus": "Complete",
        "Chapter": "100800",
        "Genres": "Drama, Mature, Psychological, Romance, School Life, Shoujo, Slice of Life, Tragedy",
        "Date": "2020-08-25T01:34:32+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4315",
        "IndexName": "Ijiranaide-Nagatoro-san",
        "SeriesName": "Ijiranaide, Nagatoro-san",
        "ScanStatus": "Ongoing",
        "Chapter": "100660",
        "Genres": "Comedy, Romance, School Life, Shounen",
        "Date": "2020-08-25T00:41:08+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4429",
        "IndexName": "Killing-Me--Killing-You",
        "SeriesName": "Killing Me \/ Killing You",
        "ScanStatus": "Ongoing",
        "Chapter": "100080",
        "Genres": "Action, Adventure, Comedy, Drama, Ecchi, Fantasy, Mature, Shounen",
        "Date": "2020-08-24T22:46:09+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "794",
        "IndexName": "Soredemo-Sekai-Wa-Utsukushii",
        "SeriesName": "Soredemo Sekai wa Utsukushii",
        "ScanStatus": "Ongoing",
        "Chapter": "101270",
        "Genres": "Adventure, Comedy, Fantasy, Romance, Shoujo",
        "Date": "2020-08-24T22:40:42+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4471",
        "IndexName": "Kyoukai-Meikyuu-To-Ikai-No-Majutsushi",
        "SeriesName": "Kyoukai Meikyuu to Ikai no Majutsushi",
        "ScanStatus": "Ongoing",
        "Chapter": "100240",
        "Genres": "Action, Adventure, Fantasy, Harem, Isekai, Romance, Shounen",
        "Date": "2020-08-24T22:40:35+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2458",
        "IndexName": "Kokoro-Kimiiro-Sakurairo",
        "SeriesName": "Kokoro Kimiiro Sakurairo",
        "ScanStatus": "Ongoing",
        "Chapter": "100210",
        "Genres": "Comedy, Josei, Romance, School Life, Slice of Life",
        "Date": "2020-08-24T22:40:30+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3315",
        "IndexName": "Kobayashi-San-Chi-No-Maid-Dragon",
        "SeriesName": "Kobayashi-san chi no Maid Dragon",
        "ScanStatus": "Ongoing",
        "Chapter": "100990",
        "Genres": "Comedy, Seinen, Shoujo Ai, Supernatural",
        "Date": "2020-08-24T22:40:24+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1803",
        "IndexName": "Chichikogusa",
        "SeriesName": "Chichikogusa",
        "ScanStatus": "Ongoing",
        "Chapter": "100370",
        "Genres": "Adventure, Comedy, Historical, Seinen, Slice of Life",
        "Date": "2020-08-24T22:40:15+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4052",
        "IndexName": "Beastars",
        "SeriesName": "Beastars",
        "ScanStatus": "Ongoing",
        "Chapter": "101890",
        "Genres": "Comedy, Drama, Fantasy, Psychological, Romance, School Life, Shounen, Slice of Life",
        "Date": "2020-08-24T22:40:08+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "42",
        "IndexName": "Vinland-Saga",
        "SeriesName": "Vinland Saga",
        "ScanStatus": "Ongoing",
        "Chapter": "101750",
        "Genres": "Action, Adventure, Drama, Historical, Mature, Seinen, Tragedy",
        "Date": "2020-08-24T21:13:41+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5022",
        "IndexName": "I-Who-Acquired-a-Trash-Skill-Thermal-Operator-Became-Unrivaled",
        "SeriesName": "I, Who Acquired a Trash Skill Thermal Operator, Became Unrivaled",
        "ScanStatus": "Complete",
        "Chapter": "100200",
        "Genres": "Action, Comedy, Fantasy, Romance, Sci-fi, Seinen, Slice of Life",
        "Date": "2020-08-24T21:13:28+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5342",
        "IndexName": "Battle-in-5-Seconds-After-Meeting",
        "SeriesName": "Battle in 5 Seconds After Meeting",
        "ScanStatus": "Ongoing",
        "Chapter": "100670",
        "Genres": "Action, Drama, Ecchi, Shounen, Supernatural",
        "Date": "2020-08-24T21:13:20+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5186",
        "IndexName": "Nega-kun-and-Posichan",
        "SeriesName": "Nega-kun and Posi-chan",
        "ScanStatus": "Ongoing",
        "Chapter": "100260",
        "Genres": "Comedy, Romance, School Life, Shounen",
        "Date": "2020-08-24T20:39:39+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2444",
        "IndexName": "Houseki-No-Kuni",
        "SeriesName": "Houseki no Kuni",
        "ScanStatus": "Ongoing",
        "Chapter": "100920",
        "Genres": "Action, Drama, Fantasy, Mystery, Psychological, Sci-fi, Seinen",
        "Date": "2020-08-24T20:39:32+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5359",
        "IndexName": "People-Looked-Down-on-Me-for-Having-a-Crummy-Job-but-It-Really-Isnt-All-That-Bad",
        "SeriesName": "People Looked Down on Me for Having a Crummy Job but It Really Isn't All That Bad?",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Action, Adventure, Fantasy, Seinen",
        "Date": "2020-08-24T20:14:48+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5358",
        "IndexName": "Onee-san-wa-Joshi-Shougakusei-ni-Kyoumi-ga-arimasu",
        "SeriesName": "Onee-san wa Joshi Shougakusei ni Kyoumi ga arimasu",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Ecchi, Lolicon, Mature, School Life, Seinen, Shoujo Ai, Slice of Life",
        "Date": "2020-08-24T20:14:25+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5357",
        "IndexName": "Moto-Kizoku-Reijou-de-Mikon-no-Haha-Desuga",
        "SeriesName": "Moto Kizoku Reijou de Mikon no Haha Desuga",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Action, Adventure, Comedy, Fantasy, Shounen, Slice of Life",
        "Date": "2020-08-24T20:14:13+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5356",
        "IndexName": "Kinjo-no-Nanako-san",
        "SeriesName": "Kinsho no Nanako-san",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Comedy, Seinen, Slice of Life",
        "Date": "2020-08-24T20:13:56+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5354",
        "IndexName": "Isekai-NTR-Shinyuu-no-Onna-wo-Saikyou-Skill-de-Otosu-Houhou",
        "SeriesName": "Isekai NTR ~Shinyuu no Onna wo Saikyou Skill de Otosu Houhou~",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Action, Adult, Adventure, Drama, Fantasy, Harem, Seinen",
        "Date": "2020-08-24T20:13:19+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5353",
        "IndexName": "Im-the-Grand-Dukes-Consort-Candidate-However-I-Believe-I-Can-Certainly-Surpass-It",
        "SeriesName": "I\u2019m the Grand Duke's Consort Candidate, However, I Believe I Can Certainly Surpass It!",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Comedy, Fantasy, Romance, Shoujo",
        "Date": "2020-08-24T20:13:01+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5352",
        "IndexName": "Im-an-Opportunistic-Princess-in-Charge-of-Solving-Things",
        "SeriesName": "I'm an Opportunistic Princess in Charge of Solving Things",
        "ScanStatus": "Ongoing",
        "Chapter": "100011",
        "Genres": "Comedy, Drama, Fantasy, Isekai, Romance, Shoujo",
        "Date": "2020-08-24T20:12:44+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5351",
        "IndexName": "Ill-Become-a-Villainess-That-Will-Go-Down-in-History",
        "SeriesName": "I'll Become a Villainess That Will Go Down in History",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Comedy, Fantasy, Historical, Isekai, Romance, Shoujo",
        "Date": "2020-08-24T20:12:18+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5350",
        "IndexName": "IDINVADED-BRAKE-BROKEN",
        "SeriesName": "ID:INVADED #BRAKE BROKEN",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Drama, Mystery, Psychological, Seinen",
        "Date": "2020-08-24T20:12:01+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2757",
        "IndexName": "Kyoudai-Hodo-Chikaku-Tooimono-Wa-Nai",
        "SeriesName": "Kyoudai hodo Chikaku Tooimono wa Nai",
        "ScanStatus": "Ongoing",
        "Chapter": "100700",
        "Genres": "Comedy, Romance, School Life, Shounen, Slice of Life",
        "Date": "2020-08-24T19:39:20+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4633",
        "IndexName": "Jahy-sama-Wa-Kujikenai",
        "SeriesName": "Jahy-sama wa Kujikenai!",
        "ScanStatus": "Ongoing",
        "Chapter": "100530",
        "Genres": "Action, Comedy, Ecchi, Shounen, Slice of Life, Supernatural",
        "Date": "2020-08-24T19:39:14+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4060",
        "IndexName": "Devilchi",
        "SeriesName": "Devilchi",
        "ScanStatus": "Ongoing",
        "Chapter": "100480",
        "Genres": "Comedy, Ecchi, Romance, School Life, Shounen, Supernatural",
        "Date": "2020-08-24T19:39:08+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3170",
        "IndexName": "The-Legendary-Moonlight-Sculptor",
        "SeriesName": "The Legendary Moonlight Sculptor",
        "ScanStatus": "Ongoing",
        "Chapter": "101490",
        "Genres": "Action, Adventure, Comedy, Drama, Fantasy, Romance, Sci-fi, Seinen",
        "Date": "2020-08-24T19:38:54+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5264",
        "IndexName": "Record-of-the-War-God",
        "SeriesName": "Record of the War God",
        "ScanStatus": "Ongoing",
        "Chapter": "100550",
        "Genres": "Action, Martial Arts, Seinen",
        "Date": "2020-08-24T19:38:46+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3249",
        "IndexName": "Xian-Ni",
        "SeriesName": "Xian Ni",
        "ScanStatus": "Ongoing",
        "Chapter": "101490",
        "Genres": "Action, Adventure, Fantasy, Martial Arts, Shounen",
        "Date": "2020-08-24T18:09:21+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3841",
        "IndexName": "Soul-Land-2",
        "SeriesName": "Soul Land 2",
        "ScanStatus": "Ongoing",
        "Chapter": "102220",
        "Genres": "Action, Adventure, Fantasy, Romance, School Life, Shounen",
        "Date": "2020-08-24T18:09:11+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3160",
        "IndexName": "Shen-Yin-Wang-Zuo",
        "SeriesName": "Shen Yin Wang Zuo",
        "ScanStatus": "Ongoing",
        "Chapter": "101861",
        "Genres": "Action, Adventure, Fantasy, Shounen, Supernatural",
        "Date": "2020-08-24T18:09:04+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3259",
        "IndexName": "Autophagy-Regulation",
        "SeriesName": "Autophagy Regulation",
        "ScanStatus": "Ongoing",
        "Chapter": "102880",
        "Genres": "Action, Adventure, Fantasy, Shounen, Supernatural",
        "Date": "2020-08-24T18:08:52+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3573",
        "IndexName": "Kaguya-Wants-To-Be-Confessed-To",
        "SeriesName": "Kaguya-sama - Love Is War",
        "ScanStatus": "Ongoing",
        "Chapter": "101990",
        "Genres": "Comedy, Drama, Romance, School Life, Seinen, Slice of Life",
        "Date": "2020-08-24T18:01:56+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3796",
        "IndexName": "Vigilante-Boku-No-Hero-Academia-Illegals",
        "SeriesName": "Vigilante: Boku no Hero Academia Illegals",
        "ScanStatus": "Ongoing",
        "Chapter": "100840",
        "Genres": "Action, Comedy, Drama, Sci-fi, Shounen, Supernatural",
        "Date": "2020-08-24T17:54:53+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4995",
        "IndexName": "Tis-Time-for-Torture-Princess",
        "SeriesName": "'Tis Time for Torture, Princess",
        "ScanStatus": "Ongoing",
        "Chapter": "100650",
        "Genres": "Comedy, Fantasy, Shounen",
        "Date": "2020-08-24T17:16:06+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1066",
        "IndexName": "Joujuu-Senjin-Mushibugyo",
        "SeriesName": "Joujuu Senjin!! Mushibugyo",
        "ScanStatus": "Ongoing",
        "Chapter": "101280",
        "Genres": "Action, Ecchi, Fantasy, Historical, Martial Arts, Romance, Shounen",
        "Date": "2020-08-24T17:15:46+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "472",
        "IndexName": "Jisatsutou",
        "SeriesName": "Jisatsutou",
        "ScanStatus": "Ongoing",
        "Chapter": "101650",
        "Genres": "Drama, Mature, Psychological, Seinen, Tragedy",
        "Date": "2020-08-24T17:15:40+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5278",
        "IndexName": "Ghost-Reaper-Girl",
        "SeriesName": "Ghost Reaper Girl",
        "ScanStatus": "Ongoing",
        "Chapter": "100040",
        "Genres": "Action, Comedy, Romance, Shounen, Supernatural",
        "Date": "2020-08-24T17:15:32+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5108",
        "IndexName": "Another-World-Munchkin",
        "SeriesName": "Another World Munchkin",
        "ScanStatus": "Ongoing",
        "Chapter": "100250",
        "Genres": "Action, Adventure, Fantasy, Isekai, Shounen",
        "Date": "2020-08-24T16:43:22+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4776",
        "IndexName": "Hitomi-chan-wa-Hito-Mishiri",
        "SeriesName": "Hitomi-chan wa Hito Mishiri",
        "ScanStatus": "Ongoing",
        "Chapter": "100450",
        "Genres": "Comedy, Romance, School Life, Shounen, Slice of Life",
        "Date": "2020-08-24T16:31:14+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4266",
        "IndexName": "Hitman-seo-Kouji",
        "SeriesName": "Hitman (SEO Kouji)",
        "ScanStatus": "Ongoing",
        "Chapter": "100710",
        "Genres": "Romance, Shounen",
        "Date": "2020-08-24T16:31:07+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4963",
        "IndexName": "Heresy",
        "SeriesName": "Heresy",
        "ScanStatus": "Ongoing",
        "Chapter": "100640",
        "Genres": "Action, Historical, Martial Arts, Shounen, Supernatural",
        "Date": "2020-08-24T15:06:19+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2299",
        "IndexName": "Youkai-Shoujo-Monsuga",
        "SeriesName": "Youkai Shoujo - Monsuga",
        "ScanStatus": "Ongoing",
        "Chapter": "101310",
        "Genres": "Action, Comedy, Ecchi, Harem, Mature, Romance, Seinen, Supernatural",
        "Date": "2020-08-24T15:02:56+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5306",
        "IndexName": "Sex-and-Dungeon",
        "SeriesName": "Sex and Dungeon",
        "ScanStatus": "Ongoing",
        "Chapter": "100080",
        "Genres": "Action, Adult, Drama, Fantasy, Harem, Isekai, School Life, Seinen",
        "Date": "2020-08-24T15:02:36+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "199",
        "IndexName": "Real-I-N-O-U-E-Takehiko",
        "SeriesName": "Real",
        "ScanStatus": "Ongoing",
        "Chapter": "100900",
        "Genres": "Drama, Psychological, Seinen, Slice of Life, Sports",
        "Date": "2020-08-24T15:02:27+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3331",
        "IndexName": "Nomi-Joshi",
        "SeriesName": "Nomi Joshi",
        "ScanStatus": "Ongoing",
        "Chapter": "100300",
        "Genres": "Comedy, Seinen, Slice of Life",
        "Date": "2020-08-24T15:02:11+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3277",
        "IndexName": "Konjiki-No-Word-Master",
        "SeriesName": "Konjiki no Word Master",
        "ScanStatus": "Ongoing",
        "Chapter": "100650",
        "Genres": "Action, Adventure, Comedy, Fantasy, Isekai, Shounen",
        "Date": "2020-08-24T15:02:02+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4860",
        "IndexName": "Furare-Girl",
        "SeriesName": "Furare Girl",
        "ScanStatus": "Ongoing",
        "Chapter": "100220",
        "Genres": "Comedy, Romance, School Life, Shoujo",
        "Date": "2020-08-24T15:01:45+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2114",
        "IndexName": "Bambino-Secondo",
        "SeriesName": "Bambino! Secondo",
        "ScanStatus": "Ongoing",
        "Chapter": "100610",
        "Genres": "Drama, Seinen, Slice of Life",
        "Date": "2020-08-24T15:01:38+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4903",
        "IndexName": "Awkward-Senpai",
        "SeriesName": "Awkward Senpai",
        "ScanStatus": "Ongoing",
        "Chapter": "100130",
        "Genres": "Comedy, Romance, Slice of Life",
        "Date": "2020-08-24T15:01:30+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "518",
        "IndexName": "Fantasy-World-Survival",
        "SeriesName": "Fantasy World Survival",
        "ScanStatus": "Ongoing",
        "Chapter": "100700",
        "Genres": "Action, Adventure, Comedy, Fantasy, Martial Arts",
        "Date": "2020-08-24T15:01:14+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5258",
        "IndexName": "Death-Is-the-Only-Ending-for-the-Villainess",
        "SeriesName": "Death Is the Only Ending for the Villainess",
        "ScanStatus": "Ongoing",
        "Chapter": "100260",
        "Genres": "Drama, Fantasy, Harem, Historical, Psychological, Romance, Shoujo",
        "Date": "2020-08-24T15:01:07+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5302",
        "IndexName": "Mutou-and-Satou",
        "SeriesName": "Mutou to Satou",
        "ScanStatus": "Ongoing",
        "Chapter": "100135",
        "Genres": "Comedy, Romance, School Life, Shounen, Slice of Life",
        "Date": "2020-08-24T07:40:55+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4881",
        "IndexName": "Monkey-Peak",
        "SeriesName": "Monkey Peak",
        "ScanStatus": "Ongoing",
        "Chapter": "100360",
        "Genres": "Drama, Horror, Mature, Mystery, Seinen, Supernatural",
        "Date": "2020-08-24T07:40:47+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5172",
        "IndexName": "Guild-no-Cheat-na-Uketsukejou",
        "SeriesName": "Guild no Cheat na Uketsukejou",
        "ScanStatus": "Ongoing",
        "Chapter": "100180",
        "Genres": "Fantasy, Gender Bender, Isekai, Seinen",
        "Date": "2020-08-24T07:40:40+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2329",
        "IndexName": "Amai-Seikatsu",
        "SeriesName": "Amai Seikatsu",
        "ScanStatus": "Ongoing",
        "Chapter": "101000",
        "Genres": "Adult, Comedy, Ecchi, Harem, Romance, Seinen",
        "Date": "2020-08-24T07:40:31+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1549",
        "IndexName": "Alfheim-No-Kishi",
        "SeriesName": "Alfheim no Kishi",
        "ScanStatus": "Ongoing",
        "Chapter": "100660",
        "Genres": "Action, Adventure, Fantasy, Gender Bender, Historical, Romance, Shoujo, Supernatural, Tragedy",
        "Date": "2020-08-24T07:40:23+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4796",
        "IndexName": "Sen-no-Sukiru-o-Motsu-Otoko",
        "SeriesName": "Sen no Sukiru o Motsu Otoko",
        "ScanStatus": "Ongoing",
        "Chapter": "100180",
        "Genres": "Action, Adventure, Fantasy, Isekai, Romance, Shounen",
        "Date": "2020-08-24T04:12:36+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3731",
        "IndexName": "Mahou-Shoujo-Tokushuusen-Asuka",
        "SeriesName": "Mahou Shoujo Tokushuusen Asuka",
        "ScanStatus": "Ongoing",
        "Chapter": "100560",
        "Genres": "Action, Drama, Horror, Mature, School Life, Seinen, Supernatural",
        "Date": "2020-08-24T04:12:30+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2751",
        "IndexName": "Koi-To-Uso",
        "SeriesName": "Koi to Uso",
        "ScanStatus": "Ongoing",
        "Chapter": "102500",
        "Genres": "Adult, Comedy, Drama, Romance, School Life, Seinen",
        "Date": "2020-08-24T04:12:22+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5157",
        "IndexName": "How-Do-We-Relationship",
        "SeriesName": "How Do We Relationship",
        "ScanStatus": "Ongoing",
        "Chapter": "100240",
        "Genres": "Drama, Romance, School Life, Shounen, Yuri",
        "Date": "2020-08-24T04:12:15+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "10",
        "IndexName": "Baby-Steps",
        "SeriesName": "Baby Steps",
        "ScanStatus": "Ongoing",
        "Chapter": "103930",
        "Genres": "Comedy, Romance, School Life, Shounen, Slice of Life, Sports",
        "Date": "2020-08-24T04:12:07+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2197",
        "IndexName": "Wind-Breaker",
        "SeriesName": "Wind Breaker",
        "ScanStatus": "Ongoing",
        "Chapter": "300460",
        "Genres": "Action, Drama, Sports",
        "Date": "2020-08-24T03:05:36+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1297",
        "IndexName": "Trump",
        "SeriesName": "Trump",
        "ScanStatus": "Ongoing",
        "Chapter": "400150",
        "Genres": "Adventure, Fantasy, Mystery, School Life, Supernatural",
        "Date": "2020-08-24T03:05:27+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4813",
        "IndexName": "Sweet-Home-KIM-Carnby",
        "SeriesName": "Sweet Home (KIM Carnby)",
        "ScanStatus": "Ongoing",
        "Chapter": "101390",
        "Genres": "Action, Drama, Horror, Psychological, Seinen",
        "Date": "2020-08-24T03:05:20+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5327",
        "IndexName": "Survive-As-The-Heros-Wife",
        "SeriesName": "Survive As The Hero's Wife",
        "ScanStatus": "Ongoing",
        "Chapter": "100730",
        "Genres": "Fantasy, Romance, Shoujo",
        "Date": "2020-08-24T02:57:00+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2501",
        "IndexName": "Yuki-Wa-Jigoku-Ni-Ochiru-No-Ka",
        "SeriesName": "Yuki wa Jigoku ni Ochiru no Ka",
        "ScanStatus": "Ongoing",
        "Chapter": "100160",
        "Genres": "Romance, Shoujo, Supernatural",
        "Date": "2020-08-24T02:56:52+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4799",
        "IndexName": "Yakuza-Reincarnation",
        "SeriesName": "Yakuza Reincarnation",
        "ScanStatus": "Ongoing",
        "Chapter": "100130",
        "Genres": "Adventure, Fantasy, Gender Bender, Isekai, Seinen",
        "Date": "2020-08-24T02:07:52+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5241",
        "IndexName": "Strike-or-Gutter",
        "SeriesName": "Strike or Gutter",
        "ScanStatus": "Ongoing",
        "Chapter": "100290",
        "Genres": "Comedy, Ecchi, Seinen, Slice of Life, Sports",
        "Date": "2020-08-24T02:07:46+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5293",
        "IndexName": "Isekai-De-Te-Ni-Ireta-Seisan-Skill-Wa-Saikyou-Datta-You-Desu",
        "SeriesName": "Isekai De Te Ni Ireta Seisan Skill Wa Saikyou Datta You Desu",
        "ScanStatus": "Ongoing",
        "Chapter": "100050",
        "Genres": "Action, Adventure, Fantasy, Harem, Isekai",
        "Date": "2020-08-24T02:07:41+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1174",
        "IndexName": "Hantsu-X-Torasshu",
        "SeriesName": "Hantsu x Torasshu",
        "ScanStatus": "Ongoing",
        "Chapter": "101800",
        "Genres": "Adult, Comedy, Ecchi, Romance, School Life, Seinen, Sports",
        "Date": "2020-08-24T02:07:35+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4788",
        "IndexName": "My-Home-Hero",
        "SeriesName": "My Home Hero",
        "ScanStatus": "Ongoing",
        "Chapter": "100640",
        "Genres": "Drama, Mature, Seinen",
        "Date": "2020-08-23T23:17:41+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4833",
        "IndexName": "Hitoribocchi-no-Isekai-Kouryaku",
        "SeriesName": "Hitoribocchi no Isekai Kouryaku",
        "ScanStatus": "Ongoing",
        "Chapter": "100330",
        "Genres": "Action, Adventure, Fantasy, Isekai",
        "Date": "2020-08-23T23:17:33+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2342",
        "IndexName": "Dead-Dead-Demons-Dededededestruction",
        "SeriesName": "Dead Dead Demon's Dededededestruction",
        "ScanStatus": "Ongoing",
        "Chapter": "100800",
        "Genres": "Drama, School Life, Sci-fi, Seinen",
        "Date": "2020-08-23T23:17:26+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4853",
        "IndexName": "Dimensional-Mercenary",
        "SeriesName": "Dimensional Mercenary",
        "ScanStatus": "Ongoing",
        "Chapter": "101300",
        "Genres": "Action, Adventure, Drama, Fantasy, Shounen",
        "Date": "2020-08-23T23:17:15+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5319",
        "IndexName": "Beware-of-the-Villainess",
        "SeriesName": "Beware of the Villainess!",
        "ScanStatus": "Ongoing",
        "Chapter": "100390",
        "Genres": "Comedy, Drama, Fantasy, Romance, Shoujo",
        "Date": "2020-08-23T23:17:07+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5299",
        "IndexName": "Koryuu-Nara-Sude-de-Taosemasu-Kedo-Kore-tte-Joushiki-Janain-Desu-ka",
        "SeriesName": "Koryuu Nara Sude de Taosemasu Kedo, Kore tte Joushiki Janain Desu ka?",
        "ScanStatus": "Ongoing",
        "Chapter": "100090",
        "Genres": "Action, Adventure, Comedy, Drama, Fantasy",
        "Date": "2020-08-23T22:20:33+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4111",
        "IndexName": "Kaifuku-Jutsushi-No-Yarinaoshi",
        "SeriesName": "Kaifuku Jutsushi no Yarinaoshi",
        "ScanStatus": "Ongoing",
        "Chapter": "100282",
        "Genres": "Action, Adult, Adventure, Drama, Fantasy, Harem, Seinen",
        "Date": "2020-08-23T22:20:26+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2495",
        "IndexName": "Tsuyokute-New-Saga",
        "SeriesName": "Tsuyokute New Saga",
        "ScanStatus": "Ongoing",
        "Chapter": "100780",
        "Genres": "Action, Adventure, Comedy, Drama, Fantasy, Harem, Romance, Shounen",
        "Date": "2020-08-23T21:50:38+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4196",
        "IndexName": "Watashi-No-Shounen-takano-Hitomi",
        "SeriesName": "Watashi no Shounen (TAKANO Hitomi)",
        "ScanStatus": "Ongoing",
        "Chapter": "100400",
        "Genres": "Drama, Psychological, Romance, Seinen, Slice of Life",
        "Date": "2020-08-23T21:19:12+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4957",
        "IndexName": "Alexis-Teikoku-Kouryuuki",
        "SeriesName": "Alexis Teikoku Kouryuuki",
        "ScanStatus": "Ongoing",
        "Chapter": "100120",
        "Genres": "Action, Adventure, Drama, Fantasy, Historical, Mature, Romance, Seinen",
        "Date": "2020-08-23T21:19:05+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1685",
        "IndexName": "Tanaka-Kun-Wa-Itsumo-Kedaruge",
        "SeriesName": "Tanaka-kun wa Itsumo Kedaruge",
        "ScanStatus": "Ongoing",
        "Chapter": "101220",
        "Genres": "Comedy, School Life, Shounen",
        "Date": "2020-08-23T19:25:57+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5023",
        "IndexName": "Kemono-Michi-AKATSUKI-Natsume",
        "SeriesName": "Kemono Michi (AKATSUKI Natsume)",
        "ScanStatus": "Ongoing",
        "Chapter": "100345",
        "Genres": "Comedy, Ecchi, Fantasy, Shounen, Slice of Life",
        "Date": "2020-08-23T19:25:48+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2701",
        "IndexName": "Front-Mission-Dog-Lifen-Dog-Style",
        "SeriesName": "Front Mission - Dog Life & Dog Style",
        "ScanStatus": "Complete",
        "Chapter": "100860",
        "Genres": "Action, Adventure, Mature, Mecha, Sci-fi, Seinen",
        "Date": "2020-08-23T19:25:39+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "914",
        "IndexName": "Demon-Seiten",
        "SeriesName": "Demon Seiten",
        "ScanStatus": "Ongoing",
        "Chapter": "100430",
        "Genres": "Comedy, Drama, Fantasy, Romance, Sci-fi, Shoujo, Supernatural",
        "Date": "2020-08-23T19:25:31+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5135",
        "IndexName": "Send-My-Regards-to-Kenshiro",
        "SeriesName": "Send My Regards to Kenshiro",
        "ScanStatus": "Ongoing",
        "Chapter": "100160",
        "Genres": "Action, Comedy, Martial Arts, Seinen",
        "Date": "2020-08-23T18:41:31+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3438",
        "IndexName": "Shirobako-Ueyama-Koukou-Animation-Doukoukai",
        "SeriesName": "Shirobako - Ueyama Koukou Animation Doukoukai",
        "ScanStatus": "Complete",
        "Chapter": "100080",
        "Genres": "Comedy, Drama, School Life, Shounen, Slice of Life",
        "Date": "2020-08-23T18:33:54+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4415",
        "IndexName": "Hokenshitsu-No-Otaku-Onee-san-Wa-Suki-Desu-Ka",
        "SeriesName": "Hokenshitsu no otaku onee-san wa Suki desu ka?",
        "ScanStatus": "Ongoing",
        "Chapter": "100110",
        "Genres": "Comedy, Romance, School Life, Seinen, Slice of Life",
        "Date": "2020-08-23T18:33:46+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5346",
        "IndexName": "Futari-Ashita-mo-Sorenari-ni",
        "SeriesName": "Futari Ashita mo Sorenari ni",
        "ScanStatus": "Ongoing",
        "Chapter": "100610",
        "Genres": "Comedy, Romance, Seinen, Slice of Life",
        "Date": "2020-08-23T18:33:40+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4945",
        "IndexName": "Undead-Unluck",
        "SeriesName": "Undead Unluck",
        "ScanStatus": "Ongoing",
        "Chapter": "100280",
        "Genres": "Action, Comedy, Sci-fi, Shounen, Supernatural",
        "Date": "2020-08-23T18:23:47+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5107",
        "IndexName": "Time-Paradox-Ghostwriter",
        "SeriesName": "Time Paradox Ghostwriter",
        "ScanStatus": "Ongoing",
        "Chapter": "100130",
        "Genres": "Mystery, Shounen",
        "Date": "2020-08-23T18:23:38+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5106",
        "IndexName": "Moriking",
        "SeriesName": "Moriking",
        "ScanStatus": "Ongoing",
        "Chapter": "100160",
        "Genres": "Action, Adventure, Comedy, Shounen",
        "Date": "2020-08-23T18:23:19+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4742",
        "IndexName": "Mission-Yozakura-Family",
        "SeriesName": "Mission: Yozakura Family",
        "ScanStatus": "Ongoing",
        "Chapter": "100470",
        "Genres": "Action, Comedy, Romance, Shounen",
        "Date": "2020-08-23T18:23:10+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5279",
        "IndexName": "Me-Roboco",
        "SeriesName": "Me & Roboco",
        "ScanStatus": "Ongoing",
        "Chapter": "100060",
        "Genres": "Comedy, Mecha, Sci-fi, Shounen",
        "Date": "2020-08-23T18:23:01+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5028",
        "IndexName": "Mashle",
        "SeriesName": "Mashle",
        "ScanStatus": "Ongoing",
        "Chapter": "100270",
        "Genres": "Action, Comedy, Fantasy, School Life, Shounen, Supernatural",
        "Date": "2020-08-23T18:22:52+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5250",
        "IndexName": "Magu-chan-God-of-Destruction",
        "SeriesName": "Magu-chan: God of Destruction",
        "ScanStatus": "Ongoing",
        "Chapter": "100080",
        "Genres": "Adventure, Fantasy, Shounen",
        "Date": "2020-08-23T18:22:44+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5249",
        "IndexName": "Hard-Boiled-Cop-and-Dolphin",
        "SeriesName": "Hard-Boiled Cop and Dolphin",
        "ScanStatus": "Ongoing",
        "Chapter": "100070",
        "Genres": "Action, Comedy, Fantasy, Shounen, Slice of Life",
        "Date": "2020-08-23T18:22:35+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5013",
        "IndexName": "Burn-the-Witch",
        "SeriesName": "Burn the Witch",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Action, Comedy, Shounen, Supernatural",
        "Date": "2020-08-23T18:22:25+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5105",
        "IndexName": "Bone-Collection",
        "SeriesName": "Bone Collection",
        "ScanStatus": "Complete",
        "Chapter": "100150",
        "Genres": "Comedy, Ecchi, Romance, School Life, Shounen, Slice of Life, Supernatural",
        "Date": "2020-08-23T18:22:18+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5248",
        "IndexName": "Ayakashi-Triangle",
        "SeriesName": "Ayakashi Triangle",
        "ScanStatus": "Ongoing",
        "Chapter": "100090",
        "Genres": "Action, Comedy, Ecchi, Gender Bender, Romance, Shounen, Supernatural",
        "Date": "2020-08-23T18:22:10+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4901",
        "IndexName": "Agravity-Boys",
        "SeriesName": "Agravity Boys",
        "ScanStatus": "Ongoing",
        "Chapter": "100320",
        "Genres": "Comedy, Sci-fi, Shounen",
        "Date": "2020-08-23T18:22:03+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3897",
        "IndexName": "We-Never-Learn",
        "SeriesName": "We Never Learn",
        "ScanStatus": "Ongoing",
        "Chapter": "101700",
        "Genres": "Comedy, Ecchi, Harem, Romance, School Life, Shounen",
        "Date": "2020-08-23T18:09:02+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4224",
        "IndexName": "Jujutsu-Kaisen",
        "SeriesName": "Jujutsu Kaisen",
        "ScanStatus": "Ongoing",
        "Chapter": "101180",
        "Genres": "Action, Fantasy, School Life, Shounen, Supernatural",
        "Date": "2020-08-23T18:08:42+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3864",
        "IndexName": "Dr-Stone",
        "SeriesName": "Dr. Stone",
        "ScanStatus": "Ongoing",
        "Chapter": "101620",
        "Genres": "Action, Adventure, Comedy, Drama, Sci-fi, Shounen",
        "Date": "2020-08-23T18:08:24+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4504",
        "IndexName": "Chainsaw-Man",
        "SeriesName": "Chainsaw Man",
        "ScanStatus": "Ongoing",
        "Chapter": "100810",
        "Genres": "Action, Comedy, Drama, Horror, Mature, Shounen, Supernatural",
        "Date": "2020-08-23T18:08:13+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3205",
        "IndexName": "Black-Clover",
        "SeriesName": "Black Clover",
        "ScanStatus": "Ongoing",
        "Chapter": "102610",
        "Genres": "Action, Adventure, Fantasy, Shounen, Supernatural",
        "Date": "2020-08-23T18:08:06+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5182",
        "IndexName": "Majo-no-Geboku-to-Maou-no-Tsuno",
        "SeriesName": "Majo no Geboku to Maou no Tsuno",
        "ScanStatus": "Ongoing",
        "Chapter": "100660",
        "Genres": "Adventure, Comedy, Fantasy, Gender Bender, Romance, Shounen, Shounen Ai, Supernatural",
        "Date": "2020-08-23T17:09:06+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4830",
        "IndexName": "Fantasy-Bishoujo-Juniku-Ojisan-to",
        "SeriesName": "Fantasy Bishoujo Juniku Ojisan to",
        "ScanStatus": "Ongoing",
        "Chapter": "100360",
        "Genres": "Comedy, Gender Bender, Isekai, Romance, Shounen",
        "Date": "2020-08-23T17:08:54+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4648",
        "IndexName": "Summer-Time-Render",
        "SeriesName": "Summer Time Render",
        "ScanStatus": "Ongoing",
        "Chapter": "101220",
        "Genres": "Drama, Ecchi, Mystery, Romance, Shounen, Supernatural",
        "Date": "2020-08-23T17:05:14+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4110",
        "IndexName": "Jigokuraku-kaku-Yuuji",
        "SeriesName": "Jigokuraku (KAKU Yuuji)",
        "ScanStatus": "Ongoing",
        "Chapter": "101085",
        "Genres": "Action, Adventure, Drama, Historical, Romance, Shounen, Supernatural",
        "Date": "2020-08-23T17:05:05+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "875",
        "IndexName": "Iryuu-Team-Medical-Dragon",
        "SeriesName": "Iryuu - Team Medical Dragon",
        "ScanStatus": "Ongoing",
        "Chapter": "101650",
        "Genres": "Drama, Mature, Seinen",
        "Date": "2020-08-23T16:50:51+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5040",
        "IndexName": "Shounin-Yuusha-wa-Isekai-wo-Gyuujiru",
        "SeriesName": "Shounin Yuusha wa Isekai wo Gyuujiru!",
        "ScanStatus": "Ongoing",
        "Chapter": "100130",
        "Genres": "Adventure, Fantasy, Isekai, Shounen",
        "Date": "2020-08-23T16:50:42+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3503",
        "IndexName": "Ake-No-Tobari",
        "SeriesName": "Ake no Tobari",
        "ScanStatus": "Ongoing",
        "Chapter": "101730",
        "Genres": "Action, Comedy, Drama, Fantasy, Supernatural",
        "Date": "2020-08-23T16:18:12+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5146",
        "IndexName": "Tomodachi-no-Imouto-ga-Ore-ni-Dake-Uzai",
        "SeriesName": "Tomodachi no Imouto ga Ore ni Dake Uzai",
        "ScanStatus": "Ongoing",
        "Chapter": "100090",
        "Genres": "Comedy, Harem, Romance, School Life, Shounen",
        "Date": "2020-08-23T15:15:12+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4299",
        "IndexName": "Vampire-Knight-Memories",
        "SeriesName": "Vampire Knight Memories",
        "ScanStatus": "Ongoing",
        "Chapter": "100280",
        "Genres": "Drama, Mystery, Romance, School Life, Shoujo, Supernatural",
        "Date": "2020-08-23T14:53:40+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3800",
        "IndexName": "Zannen-Jokanbu-Black-General-san",
        "SeriesName": "Zannen Jokanbu Black General-san",
        "ScanStatus": "Ongoing",
        "Chapter": "100660",
        "Genres": "Action, Comedy, Ecchi, Romance, Shounen",
        "Date": "2020-08-23T14:44:58+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3894",
        "IndexName": "Tongari-Booshi-No-Atorie",
        "SeriesName": "Tongari Booshi no Atorie",
        "ScanStatus": "Ongoing",
        "Chapter": "100400",
        "Genres": "Adventure, Comedy, Drama, Fantasy, Seinen",
        "Date": "2020-08-23T14:44:48+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4897",
        "IndexName": "That-Girl-Is-Not-Just-Cute",
        "SeriesName": "That Girl Is Not Just Cute",
        "ScanStatus": "Ongoing",
        "Chapter": "100780",
        "Genres": "Comedy, Romance, School Life, Shounen",
        "Date": "2020-08-23T14:44:39+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4983",
        "IndexName": "Sensei-Ore-ni-Kamawazu-Itte-Kudasai",
        "SeriesName": "Sensei, Ore ni Kamawazu Itte Kudasai!!",
        "ScanStatus": "Ongoing",
        "Chapter": "100200",
        "Genres": "Adult, Comedy, Ecchi, Harem, Romance, Seinen",
        "Date": "2020-08-23T14:44:32+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5183",
        "IndexName": "Maou-no-Musume-wa-Yasashi-Sugiru",
        "SeriesName": "Maou no Musume wa Yasashi Sugiru!!",
        "ScanStatus": "Ongoing",
        "Chapter": "100150",
        "Genres": "Comedy, Fantasy, Seinen, Slice of Life",
        "Date": "2020-08-23T14:44:14+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2128",
        "IndexName": "Darwins-Game",
        "SeriesName": "Darwin's Game",
        "ScanStatus": "Ongoing",
        "Chapter": "100870",
        "Genres": "Mature, Mystery, Psychological, Sci-fi, Shounen",
        "Date": "2020-08-23T14:44:07+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4359",
        "IndexName": "Boukensha-Ni-Naritai-To-Miyako",
        "SeriesName": "Boukensha ni Naritai to Miyako ni Deteitta Musume ga S Rank ni Natteta",
        "ScanStatus": "Ongoing",
        "Chapter": "100210",
        "Genres": "Action, Adventure, Comedy, Fantasy, Shounen",
        "Date": "2020-08-23T14:43:58+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5260",
        "IndexName": "The-Rebirth-of-the-Demon-God",
        "SeriesName": "The Rebirth of the Demon God",
        "ScanStatus": "Ongoing",
        "Chapter": "100580",
        "Genres": "Action, Fantasy, Harem, Shounen",
        "Date": "2020-08-23T14:43:53+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4339",
        "IndexName": "Spirit-Sword-Sovereign",
        "SeriesName": "Spirit Sword Sovereign",
        "ScanStatus": "Ongoing",
        "Chapter": "103010",
        "Genres": "Action, Fantasy, Martial Arts",
        "Date": "2020-08-23T07:18:10+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3983",
        "IndexName": "Mairimashita-Iruma-kun",
        "SeriesName": "Mairimashita! Iruma-kun",
        "ScanStatus": "Ongoing",
        "Chapter": "101480",
        "Genres": "Comedy, Fantasy, School Life, Shounen, Supernatural",
        "Date": "2020-08-23T04:49:39+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "221",
        "IndexName": "Giant-Killing",
        "SeriesName": "Giant Killing",
        "ScanStatus": "Ongoing",
        "Chapter": "103610",
        "Genres": "Comedy, Drama, Seinen, Sports",
        "Date": "2020-08-23T04:49:32+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4360",
        "IndexName": "Buta-Koushaku-Ni-Tensei-Shitakara",
        "SeriesName": "Buta Koushaku ni Tensei Shitakara, Kondo wa Kimi ni Suki to Iitai",
        "ScanStatus": "Ongoing",
        "Chapter": "100230",
        "Genres": "Adventure, Comedy, Fantasy, Isekai, Romance, School Life, Shounen",
        "Date": "2020-08-23T04:49:25+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3753",
        "IndexName": "Amano-Megumi-Wa-Suki-Darake",
        "SeriesName": "Amano Megumi wa Suki Darake!",
        "ScanStatus": "Ongoing",
        "Chapter": "102290",
        "Genres": "Comedy, Ecchi, Romance, School Life, Shounen",
        "Date": "2020-08-23T04:49:19+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5045",
        "IndexName": "Temple",
        "SeriesName": "Temple",
        "ScanStatus": "Ongoing",
        "Chapter": "100250",
        "Genres": "Comedy, Ecchi, Harem, Romance, School Life, Slice of Life",
        "Date": "2020-08-23T03:38:26+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4908",
        "IndexName": "Fukushuu-Kansuisha-no-Jinsei-Nishuume-Isekaitan",
        "SeriesName": "Fukushuu Kansuisha no Jinsei Nishuume Isekaitan",
        "ScanStatus": "Ongoing",
        "Chapter": "100120",
        "Genres": "Action, Adventure, Drama, Fantasy, Isekai, Romance, Seinen, Tragedy",
        "Date": "2020-08-23T03:38:12+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3321",
        "IndexName": "Lookism",
        "SeriesName": "Lookism",
        "ScanStatus": "Ongoing",
        "Chapter": "102970",
        "Genres": "Comedy, Drama, School Life, Seinen",
        "Date": "2020-08-23T03:03:21+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3465",
        "IndexName": "Gosu-The-Master",
        "SeriesName": "Gosu (The Master)",
        "ScanStatus": "Ongoing",
        "Chapter": "201020",
        "Genres": "Action, Adventure, Comedy, Drama, Martial Arts, Shounen",
        "Date": "2020-08-23T03:03:12+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5136",
        "IndexName": "Sense",
        "SeriesName": "Sense",
        "ScanStatus": "Ongoing",
        "Chapter": "100380",
        "Genres": "Adult, Harem, Romance, School Life, Seinen",
        "Date": "2020-08-23T03:03:03+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4457",
        "IndexName": "A-Story-About-Treating-A-Female-Knight-Who-Has-Never-Been-Treated-As-A-Woman-As-A-Woman",
        "SeriesName": "A Story About Treating a Female Knight, Who Has Never Been Treated as a Woman, as a Woman",
        "ScanStatus": "Ongoing",
        "Chapter": "101130",
        "Genres": "Action, Comedy, Fantasy, Romance, Shounen",
        "Date": "2020-08-23T01:33:35+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2561",
        "IndexName": "Mozuya-San-Gyakujousuru",
        "SeriesName": "Mozuya-san Gyakujousuru",
        "ScanStatus": "Ongoing",
        "Chapter": "100400",
        "Genres": "Comedy, Drama, Psychological, Romance, School Life, Seinen, Slice of Life",
        "Date": "2020-08-23T01:17:43+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5228",
        "IndexName": "Kaguya-sama-wo-Kataritai",
        "SeriesName": "Kaguya-sama wo Kataritai",
        "ScanStatus": "Ongoing",
        "Chapter": "100930",
        "Genres": "Comedy, School Life, Seinen",
        "Date": "2020-08-23T01:17:34+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5261",
        "IndexName": "Hero-I-Quit-A-Long-Time-Ago",
        "SeriesName": "Hero? I Quit A Long Time Ago",
        "ScanStatus": "Ongoing",
        "Chapter": "102110",
        "Genres": "Action, Comedy, Fantasy, Sci-fi, Shounen, Supernatural",
        "Date": "2020-08-23T01:17:27+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5251",
        "IndexName": "I-Am-The-Sorcerer-King",
        "SeriesName": "I Am the Sorcerer King",
        "ScanStatus": "Ongoing",
        "Chapter": "101050",
        "Genres": "Action, Adventure, Fantasy, Shounen, Supernatural",
        "Date": "2020-08-23T01:17:05+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4747",
        "IndexName": "Shin-No-Nakama-Janai-To-Yuusha-No-Party",
        "SeriesName": "Shin no Nakama janai to Yuusha no Party",
        "ScanStatus": "Ongoing",
        "Chapter": "100220",
        "Genres": "Action, Adventure, Comedy, Romance, Shounen, Slice of Life",
        "Date": "2020-08-22T22:23:53+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3761",
        "IndexName": "From-Maid-To-Mother",
        "SeriesName": "From Maid to Mother",
        "ScanStatus": "Ongoing",
        "Chapter": "100450",
        "Genres": "Fantasy, Romance, Shoujo, Slice of Life, Supernatural",
        "Date": "2020-08-22T22:15:24+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1652",
        "IndexName": "Montage-W-A-T-A-N-A-B-E-Jun",
        "SeriesName": "Montage (WATANABE Jun)",
        "ScanStatus": "Ongoing",
        "Chapter": "101140",
        "Genres": "Drama, Mystery, Seinen",
        "Date": "2020-08-22T22:13:28+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4075",
        "IndexName": "Isekai-Nonbiri-Nouka",
        "SeriesName": "Isekai Nonbiri Nouka",
        "ScanStatus": "Ongoing",
        "Chapter": "101260",
        "Genres": "Adventure, Fantasy, Harem, Isekai, Romance, Shounen, Slice of Life",
        "Date": "2020-08-22T22:13:22+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5167",
        "IndexName": "Bungo",
        "SeriesName": "Bungo",
        "ScanStatus": "Ongoing",
        "Chapter": "100980",
        "Genres": "Drama, School Life, Seinen, Sports",
        "Date": "2020-08-22T22:13:13+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4993",
        "IndexName": "The-Ultimate-Middle-Aged-Hunter-Travels-to-Another-World",
        "SeriesName": "The Ultimate Middle-Aged Hunter Travels to Another World",
        "ScanStatus": "Ongoing",
        "Chapter": "100112",
        "Genres": "Action, Adventure, Drama, Fantasy, Isekai, Shounen, Slice of Life",
        "Date": "2020-08-22T21:03:06+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1875",
        "IndexName": "Kitakubu-Katsudou-Kiroku",
        "SeriesName": "Kitakubu Katsudou Kiroku",
        "ScanStatus": "Ongoing",
        "Chapter": "100370",
        "Genres": "Comedy, School Life, Seinen",
        "Date": "2020-08-22T21:02:58+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1908",
        "IndexName": "Nejimaki-Kagyu",
        "SeriesName": "Nejimaki Kagyu",
        "ScanStatus": "Ongoing",
        "Chapter": "101050",
        "Genres": "Action, Comedy, Martial Arts, Romance, School Life, Seinen",
        "Date": "2020-08-22T20:01:22+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1853",
        "IndexName": "Immortal-Hounds",
        "SeriesName": "Immortal Hounds",
        "ScanStatus": "Ongoing",
        "Chapter": "100310",
        "Genres": "Action, Mystery, Seinen",
        "Date": "2020-08-22T20:01:13+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5328",
        "IndexName": "The-Villainess-Reverses-the-Hourglass",
        "SeriesName": "The Villainess Reverses the Hourglass",
        "ScanStatus": "Ongoing",
        "Chapter": "100410",
        "Genres": "Drama, Fantasy, Historical, Romance, Shoujo",
        "Date": "2020-08-22T20:00:56+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3822",
        "IndexName": "Isanghago-Aleumdaun",
        "SeriesName": "Isanghago Aleumdaun",
        "ScanStatus": "Ongoing",
        "Chapter": "100810",
        "Genres": "Fantasy, Mystery, Romance, Shoujo, Supernatural",
        "Date": "2020-08-22T20:00:46+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5317",
        "IndexName": "Zense-Coupling",
        "SeriesName": "Zense Coupling",
        "ScanStatus": "Complete",
        "Chapter": "100555",
        "Genres": "Comedy, Romance, Shoujo, Slice of Life, Supernatural",
        "Date": "2020-08-22T19:25:50+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4916",
        "IndexName": "Isekai-de-Slow-Life-wo-Ganbou",
        "SeriesName": "Isekai de Slow Life wo (Ganbou)",
        "ScanStatus": "Ongoing",
        "Chapter": "100110",
        "Genres": "Action, Adventure, Harem, Isekai, Shounen",
        "Date": "2020-08-22T19:21:25+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3714",
        "IndexName": "Danchigai",
        "SeriesName": "Danchigai",
        "ScanStatus": "Ongoing",
        "Chapter": "101130",
        "Genres": "Comedy, School Life, Seinen, Slice of Life",
        "Date": "2020-08-22T19:21:21+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4394",
        "IndexName": "The-Ghostly-Doctor",
        "SeriesName": "The Ghostly Doctor",
        "ScanStatus": "Ongoing",
        "Chapter": "102650",
        "Genres": "Action, Adventure, Drama, Fantasy, Gender Bender, Historical, Martial Arts, Romance, Shoujo",
        "Date": "2020-08-22T19:21:14+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4500",
        "IndexName": "Youkoso-Jitsuryoku-Shijou-Shugi-No-Kyoushitsu-E",
        "SeriesName": "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e",
        "ScanStatus": "Ongoing",
        "Chapter": "100360",
        "Genres": "Comedy, Drama, Ecchi, Harem, Romance, School Life, Seinen",
        "Date": "2020-08-22T19:00:20+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5038",
        "IndexName": "Shishidou-san-ni-Shikararetai",
        "SeriesName": "Shishidou-san ni Shikararetai",
        "ScanStatus": "Ongoing",
        "Chapter": "100105",
        "Genres": "Comedy, Romance, Seinen, Slice of Life",
        "Date": "2020-08-22T19:00:13+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3487",
        "IndexName": "Rengoku-No-Karma",
        "SeriesName": "Rengoku no Karma",
        "ScanStatus": "Ongoing",
        "Chapter": "100270",
        "Genres": "Drama, Mature, Mystery, Psychological, School Life, Shounen, Supernatural",
        "Date": "2020-08-22T19:00:04+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3330",
        "IndexName": "Noboru-Kotera-San",
        "SeriesName": "Noboru Kotera-san",
        "ScanStatus": "Ongoing",
        "Chapter": "100100",
        "Genres": "Comedy, Romance, School Life, Seinen, Sports",
        "Date": "2020-08-22T18:59:58+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5348",
        "IndexName": "Handsome-Girl-and-Sheltered-Girl",
        "SeriesName": "Handsome Girl and Sheltered Girl",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Comedy, Romance, Shounen, Yuri",
        "Date": "2020-08-22T17:14:41+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5347",
        "IndexName": "Futsuu-no-Koiko-chan",
        "SeriesName": "Futsuu no Koiko-chan",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Romance, School Life, Shoujo",
        "Date": "2020-08-22T17:14:20+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5345",
        "IndexName": "Expressionless-Kashiwada-san-and-Emotional-Ootakun",
        "SeriesName": "Expressionless Kashiwada-san and Emotional Oota-kun",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Comedy, Romance, School Life, Slice of Life",
        "Date": "2020-08-22T17:13:50+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5344",
        "IndexName": "Class-goto-Shuudan-Teni-Shimashita-ga",
        "SeriesName": "Class-goto Shuudan Teni Shimashita ga",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Action, Comedy, Ecchi, Fantasy, Harem, Isekai",
        "Date": "2020-08-22T17:13:38+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5343",
        "IndexName": "Boushoku-Hi-no-Ken",
        "SeriesName": "Boushoku-Hi no Ken",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Action, Adventure, Drama, Fantasy, Shounen",
        "Date": "2020-08-22T17:13:19+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5341",
        "IndexName": "As-a-Result-of-Breaking-an-Otome-Game-the-Villainess-Young-Lady-Becomes-a-Cheat",
        "SeriesName": "As a Result of Breaking an Otome Game, the Villainess Young Lady Becomes a Cheat!",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Comedy, Fantasy, Isekai, Romance, Shoujo, Slice of Life",
        "Date": "2020-08-22T17:12:43+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5340",
        "IndexName": "A-Rank-Boukensha-no-Slow-Life",
        "SeriesName": "A-Rank Boukensha No Slow Life",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Adventure, Comedy, Fantasy, Romance, Seinen",
        "Date": "2020-08-22T17:12:31+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3926",
        "IndexName": "She-Gets-Girls-Everyday",
        "SeriesName": "She Gets Girls Everyday.",
        "ScanStatus": "Ongoing",
        "Chapter": "100125",
        "Genres": "Comedy, School Life, Shoujo Ai",
        "Date": "2020-08-22T17:11:41+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5284",
        "IndexName": "Dungeon-ni-Deai-wo-Motomeru-no-wa-Machigatte-Iru-Darou-ka-II",
        "SeriesName": "Dungeon ni Deai wo Motomeru no wa Machigatte Iru Darou ka II",
        "ScanStatus": "Ongoing",
        "Chapter": "100030",
        "Genres": "Action, Adventure, Comedy, Drama, Fantasy, Romance, Seinen",
        "Date": "2020-08-22T17:11:33+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4544",
        "IndexName": "X---Epoch-Of-The-Dragon",
        "SeriesName": "X - Epoch of the Dragon",
        "ScanStatus": "Ongoing",
        "Chapter": "100810",
        "Genres": "Action, Adventure, Fantasy, Romance, Shounen",
        "Date": "2020-08-22T16:45:09+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4886",
        "IndexName": "Ookami-wa-Nemuranai",
        "SeriesName": "Ookami wa Nemuranai",
        "ScanStatus": "Ongoing",
        "Chapter": "100140",
        "Genres": "Action, Adventure, Drama, Fantasy, Mature, Seinen, Supernatural",
        "Date": "2020-08-22T16:45:00+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5197",
        "IndexName": "The-Fable",
        "SeriesName": "The Fable",
        "ScanStatus": "Ongoing",
        "Chapter": "100710",
        "Genres": "Action, Drama, Mature, Romance, Seinen",
        "Date": "2020-08-22T16:34:26+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5227",
        "IndexName": "Jiken-Jaken",
        "SeriesName": "Jiken Jaken!",
        "ScanStatus": "Ongoing",
        "Chapter": "100810",
        "Genres": "Comedy, Ecchi, Romance, School Life, Seinen",
        "Date": "2020-08-22T16:34:19+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4599",
        "IndexName": "Yukionna-To-Kani-Wo-Kuu",
        "SeriesName": "Yukionna to Kani wo Kuu",
        "ScanStatus": "Ongoing",
        "Chapter": "100560",
        "Genres": "Adult, Drama, Romance, Seinen",
        "Date": "2020-08-22T15:16:31+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3460",
        "IndexName": "Delivery-Cinderella",
        "SeriesName": "Delivery Cinderella",
        "ScanStatus": "Ongoing",
        "Chapter": "100250",
        "Genres": "Adult, Drama, Romance, School Life, Seinen",
        "Date": "2020-08-22T15:16:24+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5199",
        "IndexName": "When-I-Was-Reincarnated-in-Another-World-I-Was-a-Heroine-and-He-Was-a-Hero",
        "SeriesName": "When I Was Reincarnated in Another World, I Was a Heroine and He Was a Hero",
        "ScanStatus": "Ongoing",
        "Chapter": "100080",
        "Genres": "Adventure, Fantasy, Gender Bender, Isekai, Romance, Shounen",
        "Date": "2020-08-22T15:06:08+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3793",
        "IndexName": "Togari-Shiro",
        "SeriesName": "Togari Shiro",
        "ScanStatus": "Ongoing",
        "Chapter": "100110",
        "Genres": "Action, Drama, Mature, Seinen, Supernatural",
        "Date": "2020-08-22T15:06:01+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1688",
        "IndexName": "The-Descendant-Of-The-Dynasty",
        "SeriesName": "The Descendant of the Dynasty",
        "ScanStatus": "Ongoing",
        "Chapter": "100440",
        "Genres": "Action, Drama, Fantasy, Historical, Mystery, Romance, Shoujo, Tragedy",
        "Date": "2020-08-22T15:05:55+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4137",
        "IndexName": "Tensei-Shichatta-Yo-iya-Gomen",
        "SeriesName": "Tensei Shichatta yo (Iya, Gomen)",
        "ScanStatus": "Ongoing",
        "Chapter": "100280",
        "Genres": "Action, Adventure, Fantasy, Harem, Isekai, Romance, Shounen",
        "Date": "2020-08-22T15:05:41+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5131",
        "IndexName": "Pumpkin-Night",
        "SeriesName": "Pumpkin Night",
        "ScanStatus": "Ongoing",
        "Chapter": "100360",
        "Genres": "Action, Horror, Mature, Seinen, Tragedy",
        "Date": "2020-08-22T15:05:33+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5175",
        "IndexName": "Isekai-Tensei-Saretenee",
        "SeriesName": "Isekai Tensei... Saretenee!",
        "ScanStatus": "Ongoing",
        "Chapter": "100180",
        "Genres": "Action, Isekai, Shounen, Supernatural",
        "Date": "2020-08-22T15:05:25+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "819",
        "IndexName": "Be-Bop-High-School",
        "SeriesName": "Be-Bop High School",
        "ScanStatus": "Ongoing",
        "Chapter": "101130",
        "Genres": "Comedy, School Life, Seinen",
        "Date": "2020-08-22T15:05:18+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4992",
        "IndexName": "The-Hero-Who-Returned-Remains-the-Strongest-in-the-Modern-World",
        "SeriesName": "The Hero Who Returned Remains the Strongest in the Modern World",
        "ScanStatus": "Ongoing",
        "Chapter": "100111",
        "Genres": "Adventure, Comedy, Ecchi, Fantasy, Harem, Isekai, Romance, Shounen",
        "Date": "2020-08-22T07:59:56+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2280",
        "IndexName": "Red-Storm",
        "SeriesName": "Red Storm",
        "ScanStatus": "Ongoing",
        "Chapter": "103760",
        "Genres": "Action, Comedy, Drama",
        "Date": "2020-08-22T07:59:18+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5257",
        "IndexName": "Medical-Return",
        "SeriesName": "Medical Return",
        "ScanStatus": "Ongoing",
        "Chapter": "100790",
        "Genres": "Action, Drama, Fantasy, School Life",
        "Date": "2020-08-22T07:59:08+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4875",
        "IndexName": "Lv2-kara-Cheat-datta-Moto-Yuusha-Kouho-no-Mattari-Isekai-Life",
        "SeriesName": "Lv2 kara Cheat datta Moto Yuusha Kouho no Mattari Isekai Life",
        "ScanStatus": "Ongoing",
        "Chapter": "100160",
        "Genres": "Action, Adventure, Comedy, Fantasy, Isekai, Romance, Shounen, Slice of Life",
        "Date": "2020-08-22T06:54:07+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4932",
        "IndexName": "Realist-Maou-Niyoru-Seiiki-Naki-Isekai-Kaikaku",
        "SeriesName": "Realist Maou Niyoru Seiiki Naki Isekai Kaikaku",
        "ScanStatus": "Ongoing",
        "Chapter": "100150",
        "Genres": "Action, Drama, Fantasy, Romance, Seinen, Supernatural",
        "Date": "2020-08-22T06:33:38+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4411",
        "IndexName": "Fuufu-Ijou-Koibito-Miman",
        "SeriesName": "Fuufu Ijou, Koibito Miman.",
        "ScanStatus": "Ongoing",
        "Chapter": "100290",
        "Genres": "Comedy, Drama, Ecchi, Romance, School Life, Seinen, Slice of Life",
        "Date": "2020-08-22T06:33:27+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "332",
        "IndexName": "Gakuen-Babysitters",
        "SeriesName": "Gakuen Babysitters",
        "ScanStatus": "Ongoing",
        "Chapter": "100930",
        "Genres": "Comedy, Drama, Romance, School Life, Shoujo, Slice of Life",
        "Date": "2020-08-22T05:13:45+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5262",
        "IndexName": "Chronicles-of-Heavenly-Demon",
        "SeriesName": "Chronicles of Heavenly Demon",
        "ScanStatus": "Ongoing",
        "Chapter": "101090",
        "Genres": "Action, Fantasy, Martial Arts, Shounen, Supernatural",
        "Date": "2020-08-22T03:34:08+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4862",
        "IndexName": "Heart-Warming-Meals-with-Mother-Fenrir",
        "SeriesName": "Heart-Warming Meals with Mother Fenrir",
        "ScanStatus": "Ongoing",
        "Chapter": "100110",
        "Genres": "Adventure, Comedy, Drama, Fantasy, Isekai, Shounen, Slice of Life",
        "Date": "2020-08-22T03:33:56+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "306",
        "IndexName": "Supernatural-Investigation-Department",
        "SeriesName": "Supernatural Investigation Department",
        "ScanStatus": "Ongoing",
        "Chapter": "102700",
        "Genres": "Action, Comedy, Horror, Mystery, Supernatural",
        "Date": "2020-08-22T03:26:22+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3270",
        "IndexName": "Guardians-Of-The-Video-Game",
        "SeriesName": "Guardians of the Video Game",
        "ScanStatus": "Ongoing",
        "Chapter": "101810",
        "Genres": "Comedy, Fantasy",
        "Date": "2020-08-22T03:25:59+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4804",
        "IndexName": "Eggnoid",
        "SeriesName": "Eggnoid",
        "ScanStatus": "Ongoing",
        "Chapter": "400490",
        "Genres": "Drama, Fantasy, Romance, School Life",
        "Date": "2020-08-22T03:25:51+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4295",
        "IndexName": "Tobaku-Datenroku-Kaiji---24oku-Dasshutsu-Hen",
        "SeriesName": "Tobaku Datenroku Kaiji - 24oku Dasshutsu Hen",
        "ScanStatus": "Ongoing",
        "Chapter": "103600",
        "Genres": "Action, Drama, Psychological, Seinen",
        "Date": "2020-08-22T03:25:42+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "35",
        "IndexName": "Skip-Beat",
        "SeriesName": "Skip Beat!",
        "ScanStatus": "Ongoing",
        "Chapter": "102850",
        "Genres": "Comedy, Drama, Romance, Shoujo, Slice of Life",
        "Date": "2020-08-22T03:25:33+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4925",
        "IndexName": "Mahou-Shoujo-ni-Akogarete",
        "SeriesName": "Mahou Shoujo ni Akogarete",
        "ScanStatus": "Ongoing",
        "Chapter": "100160",
        "Genres": "Action, Comedy, Ecchi, Fantasy, Seinen, Yuri",
        "Date": "2020-08-22T03:25:24+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2543",
        "IndexName": "Jabberwocky",
        "SeriesName": "Jabberwocky",
        "ScanStatus": "Ongoing",
        "Chapter": "100180",
        "Genres": "Action, Fantasy, Sci-fi, Seinen",
        "Date": "2020-08-22T03:25:12+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4777",
        "IndexName": "Houkago-no-Goumon-Shoujo",
        "SeriesName": "Houkago no Goumon Shoujo",
        "ScanStatus": "Ongoing",
        "Chapter": "100480",
        "Genres": "Comedy, Ecchi, Harem, Mature, School Life, Shounen",
        "Date": "2020-08-22T03:25:05+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5339",
        "IndexName": "Arafoo-Shachiku-no-Golem-Master",
        "SeriesName": "Arafoo Shachiku no Golem Master",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Adventure, Fantasy, Isekai, Seinen",
        "Date": "2020-08-22T00:24:22+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5338",
        "IndexName": "Alma",
        "SeriesName": "Alma",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Adventure, Drama, Sci-fi, Seinen",
        "Date": "2020-08-22T00:24:08+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5337",
        "IndexName": "After-the-Holy-Sword-Reincarnates-Into-a-Human-Being-Its-Troubled-Because-It-Is-Favored-by-the-Hero",
        "SeriesName": "After the Holy Sword Reincarnates Into a Human Being, It\u2019s Troubled Because It Is Favored by the Hero",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Comedy, Fantasy, Josei, Romance",
        "Date": "2020-08-22T00:23:56+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5336",
        "IndexName": "Mahou-Tsukai-no-Yome-Shihen75-Inazuma-Jack-to-Yousei-Jiken",
        "SeriesName": "Mahou Tsukai no Yome Shihen.75 - Inazuma Jack to Yousei Jiken",
        "ScanStatus": "Ongoing",
        "Chapter": "100000",
        "Genres": "Adventure, Fantasy, Shounen",
        "Date": "2020-08-22T00:23:28+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5335",
        "IndexName": "Fushigi-Ygi-Byakko-Senki",
        "SeriesName": "Fushigi Y\u00fbgi - Byakko Senki",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Action, Adventure, Comedy, Drama, Fantasy, Historical, Josei, Martial Arts, Mystery, Romance, Supernatural, Tragedy",
        "Date": "2020-08-22T00:23:14+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5334",
        "IndexName": "Failed-Princesses",
        "SeriesName": "Failed Princesses",
        "ScanStatus": "Ongoing",
        "Chapter": "100010",
        "Genres": "Comedy, Drama, Psychological, Romance, School Life, Seinen, Slice of Life, Yuri",
        "Date": "2020-08-22T00:22:56+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5333",
        "IndexName": "Venus-in-the-Blind-Spot",
        "SeriesName": "Venus in the Blind Spot",
        "ScanStatus": "Complete",
        "Chapter": "100010",
        "Genres": "Horror, Psychological, Seinen",
        "Date": "2020-08-22T00:22:38+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5332",
        "IndexName": "I-Love-You-So-Much-I-Hate-You",
        "SeriesName": "I Love You So Much, I Hate You",
        "ScanStatus": "Complete",
        "Chapter": "100010",
        "Genres": "Drama, Romance, Yuri",
        "Date": "2020-08-22T00:22:24+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5331",
        "IndexName": "I-Dont-Know-How-to-Give-Birth",
        "SeriesName": "I Don't Know How to Give Birth!",
        "ScanStatus": "Complete",
        "Chapter": "100010",
        "Genres": "Comedy, Josei",
        "Date": "2020-08-22T00:22:10+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5330",
        "IndexName": "GoGo-Monster",
        "SeriesName": "GoGo Monster",
        "ScanStatus": "Complete",
        "Chapter": "100010",
        "Genres": "Drama, Psychological, School Life, Seinen, Slice of Life",
        "Date": "2020-08-22T00:21:55+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5143",
        "IndexName": "The-Undead-Lord-of-the-Palace-of-Darkness",
        "SeriesName": "The Undead Lord of the Palace of Darkness",
        "ScanStatus": "Ongoing",
        "Chapter": "100060",
        "Genres": "Action, Fantasy, Romance, Shounen",
        "Date": "2020-08-22T00:20:36+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5190",
        "IndexName": "Pseudo-Harem",
        "SeriesName": "Pseudo Harem",
        "ScanStatus": "Ongoing",
        "Chapter": "101040",
        "Genres": "Comedy, Romance, School Life, Shounen, Slice of Life",
        "Date": "2020-08-22T00:20:30+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3998",
        "IndexName": "Yankee-Wa-Isekai-De-Seirei-Ni-Aisaremasu",
        "SeriesName": "Yankee Wa Isekai De Seirei Ni Aisaremasu",
        "ScanStatus": "Ongoing",
        "Chapter": "100330",
        "Genres": "Adventure, Comedy, Fantasy, Isekai, Romance, Shounen",
        "Date": "2020-08-21T21:20:34+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4962",
        "IndexName": "Hazure-Waku-no-Joutai-Ijou-Skill",
        "SeriesName": "Hazure Waku no Joutai Ijou Skill",
        "ScanStatus": "Ongoing",
        "Chapter": "100100",
        "Genres": "Action, Adventure, Drama, Ecchi, Fantasy, Harem, Isekai, Romance, Shounen",
        "Date": "2020-08-21T21:20:28+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5030",
        "IndexName": "My-Recently-Hired-Maid-is-Suspicious",
        "SeriesName": "My Recently Hired Maid Is Suspicious",
        "ScanStatus": "Ongoing",
        "Chapter": "100086",
        "Genres": "Comedy, Romance, Shotacon, Shounen, Slice of Life",
        "Date": "2020-08-21T20:46:34+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5171",
        "IndexName": "Genkai-Level-1-kara-no-Nariagari",
        "SeriesName": "Genkai Level 1 kara no Nariagari",
        "ScanStatus": "Ongoing",
        "Chapter": "100060",
        "Genres": "Action, Fantasy, Harem, Isekai, Shounen",
        "Date": "2020-08-21T20:46:27+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "411",
        "IndexName": "Akatsuki-No-Yona",
        "SeriesName": "Akatsuki no Yona",
        "ScanStatus": "Ongoing",
        "Chapter": "101950",
        "Genres": "Action, Adventure, Comedy, Drama, Fantasy, Harem, Historical, Romance, Shoujo, Supernatural",
        "Date": "2020-08-21T20:46:21+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2507",
        "IndexName": "Ad-Astra-Scipio-To-Hannibal",
        "SeriesName": "Ad Astra - Scipio to Hannibal",
        "ScanStatus": "Ongoing",
        "Chapter": "100610",
        "Genres": "Action, Adventure, Historical, Seinen",
        "Date": "2020-08-21T20:46:13+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5252",
        "IndexName": "Overgeared",
        "SeriesName": "Overgeared",
        "ScanStatus": "Ongoing",
        "Chapter": "100410",
        "Genres": "Action, Adventure, Martial Arts, Sci-fi",
        "Date": "2020-08-21T20:46:05+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4290",
        "IndexName": "Sekkaku-Cheat",
        "SeriesName": "Sekkaku Cheat wo Moratte Isekai ni Teni shita n dakara, Suki na you ni Ikitemitai",
        "ScanStatus": "Ongoing",
        "Chapter": "100190",
        "Genres": "Action, Adult, Adventure, Comedy, Fantasy, Harem, Isekai, Seinen",
        "Date": "2020-08-21T19:26:12+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4909",
        "IndexName": "Fushigi-no-Kuni-no-Bird",
        "SeriesName": "Fushigi no Kuni no Bird",
        "ScanStatus": "Ongoing",
        "Chapter": "100270",
        "Genres": "Adventure, Historical, Seinen, Slice of Life",
        "Date": "2020-08-21T19:26:04+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5144",
        "IndexName": "The-Vengeful-White-Cat-Lounging-on-the-Dragon-Kings-Lap",
        "SeriesName": "A Vengeful White Cat Lounges Around on the Dragon King's Lap",
        "ScanStatus": "Ongoing",
        "Chapter": "100181",
        "Genres": "Fantasy, Isekai, Romance, Shoujo",
        "Date": "2020-08-21T19:25:58+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4582",
        "IndexName": "Kouya-Ni-Kemono-Doukokusu",
        "SeriesName": "Kouya ni Kemono Doukokusu",
        "ScanStatus": "Ongoing",
        "Chapter": "100560",
        "Genres": "Action, Drama, Mature, Sci-fi, Seinen, Supernatural",
        "Date": "2020-08-21T17:23:49+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3475",
        "IndexName": "Koudaike-No-Hitobito",
        "SeriesName": "Koudaike no Hitobito",
        "ScanStatus": "Ongoing",
        "Chapter": "100260",
        "Genres": "Comedy, Drama, Josei, Romance, Slice of Life, Supernatural",
        "Date": "2020-08-21T17:23:43+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1265",
        "IndexName": "Cosplay-Animal",
        "SeriesName": "Cosplay Animal",
        "ScanStatus": "Ongoing",
        "Chapter": "100420",
        "Genres": "Comedy, Romance, Shoujo, Smut",
        "Date": "2020-08-21T17:23:37+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4407",
        "IndexName": "Class-Ga-Isekai-Shoukan-Sareta-Naka-Ore-Dake-Nokotta-N-Desu-Ga",
        "SeriesName": "Class ga Isekai Shoukan sareta Naka Ore dake Nokotta n desu ga",
        "ScanStatus": "Ongoing",
        "Chapter": "100250",
        "Genres": "Action, Comedy, Fantasy, Harem, Isekai, Romance, School Life, Shounen",
        "Date": "2020-08-21T17:23:31+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "485",
        "IndexName": "Persona3",
        "SeriesName": "Persona 3",
        "ScanStatus": "Ongoing",
        "Chapter": "100260",
        "Genres": "Action, Adventure, Comedy, Fantasy, Mystery, Romance, School Life, Seinen, Slice of Life, Supernatural, Tragedy",
        "Date": "2020-08-21T16:06:52+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3557",
        "IndexName": "Arifureta-Shokugyou-De-Sekai-Saikyou",
        "SeriesName": "Arifureta Shokugyou de Sekai Saikyou",
        "ScanStatus": "Ongoing",
        "Chapter": "100430",
        "Genres": "Action, Adventure, Comedy, Drama, Fantasy, Harem, Romance, Shounen",
        "Date": "2020-08-21T16:06:17+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2822",
        "IndexName": "Teiichi-No-Kuni",
        "SeriesName": "Teiichi no Kuni",
        "ScanStatus": "Ongoing",
        "Chapter": "100190",
        "Genres": "Drama, Psychological, School Life, Shounen",
        "Date": "2020-08-21T15:04:25+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2395",
        "IndexName": "Sugars-Y-A-M-A-M-O-R-I-Mika",
        "SeriesName": "Sugars (YAMAMORI Mika)",
        "ScanStatus": "Complete",
        "Chapter": "100286",
        "Genres": "Romance, School Life, Shoujo",
        "Date": "2020-08-21T15:03:17+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4889",
        "IndexName": "Risou-no-Musume-Nara-Sekai-Saikyou-Demo-Kawaigatte-Kuremasuka",
        "SeriesName": "Risou no Musume Nara Sekai Saikyou Demo Kawaigatte Kuremasuka",
        "ScanStatus": "Ongoing",
        "Chapter": "100142",
        "Genres": "Action, Comedy, Ecchi, Fantasy, School Life, Sci-fi, Shounen",
        "Date": "2020-08-21T15:03:10+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2574",
        "IndexName": "Rengoku-Ni-Warau",
        "SeriesName": "Rengoku ni Warau",
        "ScanStatus": "Ongoing",
        "Chapter": "100580",
        "Genres": "Historical, Shoujo",
        "Date": "2020-08-21T15:03:02+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4637",
        "IndexName": "Koroshi-Ai",
        "SeriesName": "Koroshi Ai",
        "ScanStatus": "Ongoing",
        "Chapter": "100530",
        "Genres": "Action, Drama, Psychological, Romance, Shoujo",
        "Date": "2020-08-21T15:02:49+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5121",
        "IndexName": "Isekai-Monster-Breeder",
        "SeriesName": "Isekai Monster Breeder",
        "ScanStatus": "Ongoing",
        "Chapter": "100070",
        "Genres": "Action, Adventure, Comedy, Ecchi, Fantasy, Isekai, Seinen",
        "Date": "2020-08-21T15:02:39+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5220",
        "IndexName": "29-sai-Dokushin-Chuuken-Boukensha-no-Nichijou",
        "SeriesName": "29-sai Dokushin Chuuken Boukensha no Nichijou",
        "ScanStatus": "Ongoing",
        "Chapter": "100250",
        "Genres": "Adventure, Comedy, Fantasy, Shounen",
        "Date": "2020-08-21T15:02:32+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "7",
        "IndexName": "One-Piece",
        "SeriesName": "One Piece",
        "ScanStatus": "Ongoing",
        "Chapter": "109880",
        "Genres": "Action, Adventure, Comedy, Drama, Fantasy, Shounen",
        "Date": "2020-08-21T14:40:11+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4831",
        "IndexName": "GANTZE",
        "SeriesName": "Gantz:E",
        "ScanStatus": "Ongoing",
        "Chapter": "100090",
        "Genres": "Action, Drama, Historical, Sci-fi, Seinen, Tragedy",
        "Date": "2020-08-21T14:40:00+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5301",
        "IndexName": "Mikakunin-de-Shinkoukei",
        "SeriesName": "Mikakunin de Shinkoukei",
        "ScanStatus": "Ongoing",
        "Chapter": "101330",
        "Genres": "Comedy, Romance, School Life, Seinen, Supernatural",
        "Date": "2020-08-21T07:56:14+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5300",
        "IndexName": "Level-1-no-Saikyou-kenja",
        "SeriesName": "Level 1 no Saikyou kenja",
        "ScanStatus": "Ongoing",
        "Chapter": "100070",
        "Genres": "Action, Adventure, Fantasy, Harem, Isekai, Romance",
        "Date": "2020-08-21T07:56:09+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "27",
        "IndexName": "Kuroshitsuji",
        "SeriesName": "Kuroshitsuji",
        "ScanStatus": "Ongoing",
        "Chapter": "101670",
        "Genres": "Action, Comedy, Drama, Historical, Mystery, Shounen, Supernatural",
        "Date": "2020-08-21T07:56:03+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5282",
        "IndexName": "A-Simple-Task-of-Providing-Support-from-the-Shadows-to-Defeat-the-Demon-Lord",
        "SeriesName": "A Simple Task of Providing Support from the Shadows to Defeat the Demon Lord",
        "ScanStatus": "Ongoing",
        "Chapter": "100100",
        "Genres": "Action, Adventure, Comedy, Fantasy, Shounen",
        "Date": "2020-08-21T07:55:55+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4999",
        "IndexName": "Useless-Ponko",
        "SeriesName": "Useless Ponko",
        "ScanStatus": "Ongoing",
        "Chapter": "100350",
        "Genres": "Comedy, Drama, Sci-fi, Seinen, Slice of Life",
        "Date": "2020-08-21T06:21:27+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4191",
        "IndexName": "Star-Martial-God-Technique",
        "SeriesName": "Star Martial God Technique",
        "ScanStatus": "Ongoing",
        "Chapter": "103720",
        "Genres": "Action, Adventure, Drama, Fantasy, Martial Arts, Romance, Shounen",
        "Date": "2020-08-21T06:21:21+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4430",
        "IndexName": "Koi-Wo-Shiranai-Bokutachi-Wa",
        "SeriesName": "Koi wo Shiranai Bokutachi wa",
        "ScanStatus": "Ongoing",
        "Chapter": "100280",
        "Genres": "Romance, School Life, Shoujo, Slice of Life",
        "Date": "2020-08-21T06:21:13+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2132",
        "IndexName": "Futari-Ecchi",
        "SeriesName": "Futari Ecchi",
        "ScanStatus": "Ongoing",
        "Chapter": "102760",
        "Genres": "Adult, Comedy, Romance, Seinen",
        "Date": "2020-08-21T06:21:01+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4051",
        "IndexName": "Ayakashiko",
        "SeriesName": "Ayakashiko",
        "ScanStatus": "Ongoing",
        "Chapter": "100600",
        "Genres": "Comedy, Fantasy, Seinen, Slice of Life",
        "Date": "2020-08-21T06:20:41+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5188",
        "IndexName": "Oshi-no-Ko",
        "SeriesName": "Oshi no Ko",
        "ScanStatus": "Ongoing",
        "Chapter": "100140",
        "Genres": "Comedy, Drama, Mystery, Seinen, Slice of Life, Supernatural, Tragedy",
        "Date": "2020-08-21T03:09:47+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "157",
        "IndexName": "The-God-Of-High-School",
        "SeriesName": "The God of High School",
        "ScanStatus": "Ongoing",
        "Chapter": "104760",
        "Genres": "Action, Adventure, Comedy, Martial Arts, Shounen",
        "Date": "2020-08-21T03:07:05+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "1689",
        "IndexName": "The-Gamer",
        "SeriesName": "The Gamer",
        "ScanStatus": "Ongoing",
        "Chapter": "401460",
        "Genres": "Action, Comedy, School Life, Shounen, Supernatural",
        "Date": "2020-08-21T03:06:56+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4808",
        "IndexName": "No-Scope",
        "SeriesName": "No Scope",
        "ScanStatus": "Ongoing",
        "Chapter": "100690",
        "Genres": "Action, School Life, Sci-fi, Shounen",
        "Date": "2020-08-21T03:06:47+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3571",
        "IndexName": "Hardcore-Leveling-Warrior",
        "SeriesName": "Hardcore Leveling Warrior",
        "ScanStatus": "Ongoing",
        "Chapter": "200550",
        "Genres": "Action, Comedy, Drama, Fantasy, Shounen",
        "Date": "2020-08-21T03:06:39+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4803",
        "IndexName": "Choco-Latte",
        "SeriesName": "Choco Latte",
        "ScanStatus": "Ongoing",
        "Chapter": "100460",
        "Genres": "Romance, School Life",
        "Date": "2020-08-21T03:06:33+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2514",
        "IndexName": "G-T-O-Paradise-Lost",
        "SeriesName": "GTO - Paradise Lost",
        "ScanStatus": "Ongoing",
        "Chapter": "101250",
        "Genres": "Comedy, Drama, School Life, Seinen",
        "Date": "2020-08-21T03:06:13+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4398",
        "IndexName": "Worlds-End-Harem---Fantasia",
        "SeriesName": "World's End Harem - Fantasia",
        "ScanStatus": "Ongoing",
        "Chapter": "100162",
        "Genres": "Adventure, Drama, Ecchi, Fantasy, Harem, Mature, Romance, Seinen",
        "Date": "2020-08-21T02:38:57+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5044",
        "IndexName": "Sword-Art-Online-Ordinal-Scale",
        "SeriesName": "Sword Art Online - Ordinal Scale",
        "ScanStatus": "Ongoing",
        "Chapter": "100160",
        "Genres": "Action, Adventure, Drama, Sci-fi, Shounen",
        "Date": "2020-08-21T02:38:44+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2279",
        "IndexName": "Red-Eyes",
        "SeriesName": "Red Eyes",
        "ScanStatus": "Ongoing",
        "Chapter": "100710",
        "Genres": "Action, Drama, Mecha, Sci-fi, Seinen",
        "Date": "2020-08-21T02:38:35+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5245",
        "IndexName": "Uragirareta-S-Rank-Boukensha",
        "SeriesName": "Uragirareta S Rank Boukensha",
        "ScanStatus": "Ongoing",
        "Chapter": "100090",
        "Genres": "Action, Adult, Adventure, Ecchi, Fantasy, Harem, Romance",
        "Date": "2020-08-21T01:55:21+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4241",
        "IndexName": "Souboutei-Kowasu-Beshi",
        "SeriesName": "Souboutei Kowasu Beshi",
        "ScanStatus": "Ongoing",
        "Chapter": "102050",
        "Genres": "Action, Adventure, Horror, Shounen, Supernatural",
        "Date": "2020-08-21T01:55:14+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5240",
        "IndexName": "Shitsugyou-Kenja-no-Nariagari",
        "SeriesName": "Shitsugyou Kenja no Nariagari",
        "ScanStatus": "Ongoing",
        "Chapter": "100090",
        "Genres": "Action, Adventure, Comedy, Fantasy, Isekai",
        "Date": "2020-08-21T01:55:07+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4273",
        "IndexName": "Kawaiikereba-Hentai-Demo-Suki-Ni-Natte-Kuremasu-Ka",
        "SeriesName": "Kawaiikereba Hentai demo Suki ni Natte Kuremasu ka?",
        "ScanStatus": "Ongoing",
        "Chapter": "100330",
        "Genres": "Comedy, Ecchi, Harem, Romance, School Life, Shounen",
        "Date": "2020-08-21T01:55:01+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4247",
        "IndexName": "Tonikaku-Kawaii",
        "SeriesName": "Tonikaku Cawaii",
        "ScanStatus": "Ongoing",
        "Chapter": "101210",
        "Genres": "Comedy, Romance, Shounen",
        "Date": "2020-08-21T01:09:47+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4869",
        "IndexName": "Its-Not-Meguro-sans-First-Time",
        "SeriesName": "It's Not Meguro-san's First Time",
        "ScanStatus": "Ongoing",
        "Chapter": "100340",
        "Genres": "Comedy, Romance, School Life, Shounen, Slice of Life",
        "Date": "2020-08-21T01:09:41+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4769",
        "IndexName": "Akuyaku-Reijou-wa-Shoumin-ni-Totsugitai",
        "SeriesName": "Akuyaku Reijou wa, Shoumin ni Totsugitai!!",
        "ScanStatus": "Ongoing",
        "Chapter": "100100",
        "Genres": "Comedy, Fantasy, Isekai, Romance, Shoujo",
        "Date": "2020-08-21T01:09:24+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5256",
        "IndexName": "The-Reason-Why-Raeliana-Ended-Up-at-the-Dukes-Mansion",
        "SeriesName": "The Reason Why Raeliana Ended Up at the Duke's Mansion",
        "ScanStatus": "Ongoing",
        "Chapter": "101290",
        "Genres": "Fantasy, Mystery, Romance, Shoujo",
        "Date": "2020-08-21T01:09:14+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4940",
        "IndexName": "The-100-Girlfriends-Who-Really-Really-Really-Really-Really-Love-You",
        "SeriesName": "The 100 Girlfriends Who Really, Really, Really, Really, Really Love You",
        "ScanStatus": "Ongoing",
        "Chapter": "100280",
        "Genres": "Comedy, Harem, Romance, School Life, Shounen",
        "Date": "2020-08-20T22:42:27+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4843",
        "IndexName": "Saikyou-Yuusha-wa-Oharaibako",
        "SeriesName": "Saikyou Yuusha wa Oharaibako",
        "ScanStatus": "Ongoing",
        "Chapter": "100110",
        "Genres": "Action, Adventure, Comedy, Fantasy, Shounen",
        "Date": "2020-08-20T22:42:20+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4767",
        "IndexName": "100-nin-no-Eiyuu-o-Sodateta-Saikyou-Yogensha-wa",
        "SeriesName": "100-nin no Eiyuu o Sodateta Saikyou Yogensha wa",
        "ScanStatus": "Ongoing",
        "Chapter": "100160",
        "Genres": "Action, Adventure, Comedy, Fantasy, Isekai, Shounen",
        "Date": "2020-08-20T22:41:59+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3223",
        "IndexName": "Jyashin-Chan-Dropkick",
        "SeriesName": "Jyashin-chan Dropkick",
        "ScanStatus": "Ongoing",
        "Chapter": "100830",
        "Genres": "Comedy, Ecchi, Fantasy, Seinen, Slice of Life",
        "Date": "2020-08-20T21:06:11+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4972",
        "IndexName": "Kubo-san-wa-Boku-Mobu-wo-Yurusanai",
        "SeriesName": "Kubo-san wa Boku (Mobu) wo Yurusanai",
        "ScanStatus": "Ongoing",
        "Chapter": "100360",
        "Genres": "Comedy, Romance, School Life, Seinen",
        "Date": "2020-08-20T21:03:38+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3968",
        "IndexName": "Gaikotsu-Kishi-sama-Tadaima",
        "SeriesName": "Gaikotsu Kishi-sama Tadaima Isekai e o Dekake-chuu",
        "ScanStatus": "Ongoing",
        "Chapter": "100340",
        "Genres": "Action, Adventure, Fantasy, Harem, Isekai, Supernatural",
        "Date": "2020-08-20T21:03:25+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4855",
        "IndexName": "Anata-no-Danna-Uwaki-Shitemasu-yo",
        "SeriesName": "Anata no Danna Uwaki shitemasu yo",
        "ScanStatus": "Ongoing",
        "Chapter": "100170",
        "Genres": "Action, Adventure, Comedy, Ecchi, Fantasy, Harem, Romance, Shounen",
        "Date": "2020-08-20T21:03:16+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "536",
        "IndexName": "Acchi-Kocchi",
        "SeriesName": "Acchi Kocchi",
        "ScanStatus": "Ongoing",
        "Chapter": "100650",
        "Genres": "Comedy, Romance, Seinen",
        "Date": "2020-08-20T21:03:09+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "361",
        "IndexName": "Kingdom",
        "SeriesName": "Kingdom",
        "ScanStatus": "Ongoing",
        "Chapter": "106500",
        "Genres": "Action, Drama, Historical, Seinen",
        "Date": "2020-08-20T19:49:00+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3838",
        "IndexName": "Oooku",
        "SeriesName": "Oooku",
        "ScanStatus": "Ongoing",
        "Chapter": "100170",
        "Genres": "Drama, Harem, Historical, Mature, Romance, Shoujo, Slice of Life",
        "Date": "2020-08-20T19:38:46+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4584",
        "IndexName": "Maou-No-Mama-Ni-Narundayo",
        "SeriesName": "Maou no Mama ni Narundayo!",
        "ScanStatus": "Ongoing",
        "Chapter": "100130",
        "Genres": "Comedy, Ecchi, Fantasy, Shounen",
        "Date": "2020-08-20T19:38:30+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3623",
        "IndexName": "Kakushigoto",
        "SeriesName": "Kakushigoto",
        "ScanStatus": "Ongoing",
        "Chapter": "100060",
        "Genres": "Comedy, Drama, Psychological, Shounen, Slice of Life",
        "Date": "2020-08-20T19:38:18+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4603",
        "IndexName": "Araburu-Kisetsu-No-Otomedomo-Yo",
        "SeriesName": "Araburu Kisetsu no Otomedomo yo.",
        "ScanStatus": "Ongoing",
        "Chapter": "100240",
        "Genres": "Comedy, Drama, Romance, School Life, Shounen, Slice of Life",
        "Date": "2020-08-20T19:38:07+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4696",
        "IndexName": "Urusei-Yatsura",
        "SeriesName": "Urusei Yatsura",
        "ScanStatus": "Ongoing",
        "Chapter": "101250",
        "Genres": "Comedy, Ecchi, Harem, Romance, School Life, Sci-fi, Shounen, Slice of Life, Supernatural",
        "Date": "2020-08-20T19:29:00+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2767",
        "IndexName": "Mikami-Sensei-No-Aishikata",
        "SeriesName": "Mikami-sensei no Aishikata",
        "ScanStatus": "Complete",
        "Chapter": "100290",
        "Genres": "Comedy, Romance, School Life, Shoujo",
        "Date": "2020-08-20T19:28:09+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2508",
        "IndexName": "Ao-Natsu",
        "SeriesName": "Ao Natsu",
        "ScanStatus": "Complete",
        "Chapter": "100340",
        "Genres": "Drama, Romance, Shoujo, Slice of Life",
        "Date": "2020-08-20T19:26:58+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3889",
        "IndexName": "Slow-Motion-Wo-Mou-Ichido",
        "SeriesName": "Slow Motion wo Mou Ichido",
        "ScanStatus": "Ongoing",
        "Chapter": "100560",
        "Genres": "Comedy, Romance, School Life, Seinen",
        "Date": "2020-08-20T19:23:02+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5049",
        "IndexName": "Zennin-Ossan-Umarekawattara-SSS-Rank-Jinsei-ga-Kakutei-Shita",
        "SeriesName": "Zennin Ossan, Umarekawattara SSS Rank Jinsei ga Kakutei Shita",
        "ScanStatus": "Ongoing",
        "Chapter": "100130",
        "Genres": "Action, Adventure, Comedy, Fantasy, Shounen, Supernatural",
        "Date": "2020-08-20T18:06:30+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4984",
        "IndexName": "Shounen-Chotto-Sabotteko",
        "SeriesName": "Shounen, Chotto Sabotteko?",
        "ScanStatus": "Ongoing",
        "Chapter": "100370",
        "Genres": "Comedy, Ecchi, Romance, Seinen, Slice of Life",
        "Date": "2020-08-20T18:06:25+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4610",
        "IndexName": "Henkyou-No-Roukishi---Bard-Loen",
        "SeriesName": "Henkyou no Roukishi - Bard Loen",
        "ScanStatus": "Ongoing",
        "Chapter": "100220",
        "Genres": "Action, Adventure, Drama, Fantasy, Seinen",
        "Date": "2020-08-20T18:06:18+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5180",
        "IndexName": "Kimi-Ga-Shinu-Made-Ato-100-Nichi",
        "SeriesName": "Kimi Ga Shinu Made Ato 100 Nichi",
        "ScanStatus": "Ongoing",
        "Chapter": "100410",
        "Genres": "Comedy, Romance, School Life, Shoujo, Slice of Life, Supernatural",
        "Date": "2020-08-20T17:27:05+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5304",
        "IndexName": "Reincarnated-as-an-Aristocrat-with-an-Appraisal-Skill",
        "SeriesName": "Reincarnated as an Aristocrat with an Appraisal Skill",
        "ScanStatus": "Ongoing",
        "Chapter": "100090",
        "Genres": "Action, Fantasy, Isekai, Shounen",
        "Date": "2020-08-20T17:05:28+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5280",
        "IndexName": "Monster-8",
        "SeriesName": "Monster #8",
        "ScanStatus": "Ongoing",
        "Chapter": "100080",
        "Genres": "Action, Comedy, Horror, Sci-fi, Shounen",
        "Date": "2020-08-20T17:05:21+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3216",
        "IndexName": "Dragon-Ball-Super",
        "SeriesName": "Dragon Ball Super",
        "ScanStatus": "Ongoing",
        "Chapter": "100630",
        "Genres": "Action, Adventure, Comedy, Drama, Fantasy, Sci-fi, Shounen",
        "Date": "2020-08-20T17:05:08+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3541",
        "IndexName": "Boruto",
        "SeriesName": "Boruto",
        "ScanStatus": "Ongoing",
        "Chapter": "100490",
        "Genres": "Action, Adventure, Comedy, Drama, Fantasy, Shounen",
        "Date": "2020-08-20T17:04:59+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4406",
        "IndexName": "Blue-Hearts",
        "SeriesName": "Blue Hearts",
        "ScanStatus": "Ongoing",
        "Chapter": "100380",
        "Genres": "Comedy, Drama, Romance, School Life, Slice of Life",
        "Date": "2020-08-20T16:25:03+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5247",
        "IndexName": "Yuusha-sama-no-Osananajimi",
        "SeriesName": "Yuusha-sama No Osananajimi",
        "ScanStatus": "Ongoing",
        "Chapter": "100070",
        "Genres": "Fantasy, Isekai, Romance, Shoujo, Slice of Life",
        "Date": "2020-08-20T16:24:56+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4177",
        "IndexName": "Neko-No-Otera-No-Chion-san",
        "SeriesName": "Neko no Otera no Chion-san",
        "ScanStatus": "Ongoing",
        "Chapter": "100450",
        "Genres": "Comedy, Romance, Seinen, Slice of Life",
        "Date": "2020-08-20T16:24:49+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2447",
        "IndexName": "Iinazuke-Kyoutei",
        "SeriesName": "Iinazuke Kyoutei",
        "ScanStatus": "Ongoing",
        "Chapter": "100490",
        "Genres": "Comedy, Ecchi, Harem, Romance, School Life, Seinen",
        "Date": "2020-08-20T16:24:43+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "2830",
        "IndexName": "Trash",
        "SeriesName": "Trash",
        "ScanStatus": "Ongoing",
        "Chapter": "100510",
        "Genres": "Action, Adult, Drama, Yuri",
        "Date": "2020-08-20T15:18:22+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "3332",
        "IndexName": "Omoi-Omoware-Furi-Furare",
        "SeriesName": "Omoi, Omoware, Furi, Furare",
        "ScanStatus": "Ongoing",
        "Chapter": "100410",
        "Genres": "Comedy, Drama, Romance, School Life, Shoujo",
        "Date": "2020-08-20T15:18:13+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "5229",
        "IndexName": "Kumo-Desu-ga-Nani-ka-Daily-Life-of-the-Four-Spider-Sisters",
        "SeriesName": "Kumo Desu ga, Nani ka? Daily Life of the Four Spider Sisters",
        "ScanStatus": "Ongoing",
        "Chapter": "100460",
        "Genres": "Action, Adventure, Comedy, Fantasy, Isekai, Seinen, Supernatural",
        "Date": "2020-08-20T15:18:07+00:00",
        "IsEdd": false
    }, {
        "SeriesID": "4522",
        "IndexName": "Kengan-Omega",
        "SeriesName": "Kengan Omega",
        "ScanStatus": "Ongoing",
        "Chapter": "100730",
        "Genres": "Action, Drama, Martial Arts",
        "Date": "2020-08-20T15:17:58+00:00",
        "IsEdd": false
    }];
    vm.NewSeriesJSON = [{
        "IndexName": "The-Former-Structural-Analysts-Otherworldly-Adventure-Story",
        "SeriesName": "The Former Structural Analyst's Otherworldly Adventure Story"
    }, {
        "IndexName": "The-Child-Loved-by-God",
        "SeriesName": "The Child Loved by God"
    }, {
        "IndexName": "Tenshoku-no-Shinden-o-Hirakimashita",
        "SeriesName": "Tenshoku no Shinden wo Hirakimashita"
    }, {
        "IndexName": "Tensei-Kusushi-wa-Isekai-wo-Meguru",
        "SeriesName": "Tensei Kusushi wa Isekai wo Meguru"
    }, {
        "IndexName": "Shoukan-sareta-Kenja-wa-Isekai-wo-Yuku",
        "SeriesName": "Shoukan sareta Kenja wa Isekai wo Yuku"
    }, {
        "IndexName": "Shishunki-chan-no-Shitsukekata",
        "SeriesName": "Shishunki-chan no Shitsukekata"
    }, {
        "IndexName": "Shikkoku-Tsukai-no-Saikyou-Yuusha",
        "SeriesName": "Shikkoku Tsukai No Saikyou Yuusha"
    }, {
        "IndexName": "Shijou-Saikyou-no-Daimaou-Murabito-A-ni-Tensei-suru",
        "SeriesName": "Shijou Saikyou no Daimaou, Murabito A ni Tensei suru"
    }, {
        "IndexName": "Seiken-Gakuin-no-Maken-Tsukai",
        "SeriesName": "Seiken Gakuin no Maken Tsukai"
    }, {
        "IndexName": "Samayoeru-Tensei-shatachi-no-Relive-Game",
        "SeriesName": "Samayoeru Tensei-sha-tachi no Relive Game"
    }, {
        "IndexName": "People-Looked-Down-on-Me-for-Having-a-Crummy-Job-but-It-Really-Isnt-All-That-Bad",
        "SeriesName": "People Looked Down on Me for Having a Crummy Job but It Really Isn't All That Bad?"
    }, {
        "IndexName": "Onee-san-wa-Joshi-Shougakusei-ni-Kyoumi-ga-arimasu",
        "SeriesName": "Onee-san wa Joshi Shougakusei ni Kyoumi ga arimasu"
    }, {
        "IndexName": "Moto-Kizoku-Reijou-de-Mikon-no-Haha-Desuga",
        "SeriesName": "Moto Kizoku Reijou de Mikon no Haha Desuga"
    }, {
        "IndexName": "Kinjo-no-Nanako-san",
        "SeriesName": "Kinsho no Nanako-san"
    }, {
        "IndexName": "Kekkon-Surutte-Hontou-desu-ka-365-Days-to-the-Wedding",
        "SeriesName": "Kekkon Surutte, Hontou desu ka?: 365 Days to the Wedding"
    }, {
        "IndexName": "Isekai-NTR-Shinyuu-no-Onna-wo-Saikyou-Skill-de-Otosu-Houhou",
        "SeriesName": "Isekai NTR ~Shinyuu no Onna wo Saikyou Skill de Otosu Houhou~"
    }, {
        "IndexName": "Im-the-Grand-Dukes-Consort-Candidate-However-I-Believe-I-Can-Certainly-Surpass-It",
        "SeriesName": "I\u2019m the Grand Duke's Consort Candidate, However, I Believe I Can Certainly Surpass It!"
    }, {
        "IndexName": "Im-an-Opportunistic-Princess-in-Charge-of-Solving-Things",
        "SeriesName": "I'm an Opportunistic Princess in Charge of Solving Things"
    }, {
        "IndexName": "Ill-Become-a-Villainess-That-Will-Go-Down-in-History",
        "SeriesName": "I'll Become a Villainess That Will Go Down in History"
    }, {
        "IndexName": "IDINVADED-BRAKE-BROKEN",
        "SeriesName": "ID:INVADED #BRAKE BROKEN"
    }, {
        "IndexName": "Ichioku-nen-Button-o-Renda-Shita-Ore-wa-Kizuitara-Saikyou-ni-Natteita",
        "SeriesName": "Ichioku-nen Button o Renda Shita Ore wa, Kizuitara Saikyou ni Natteita"
    }, {
        "IndexName": "Handsome-Girl-and-Sheltered-Girl",
        "SeriesName": "Handsome Girl and Sheltered Girl"
    }, {
        "IndexName": "Futsuu-no-Koiko-chan",
        "SeriesName": "Futsuu no Koiko-chan"
    }, {
        "IndexName": "Futari-Ashita-mo-Sorenari-ni",
        "SeriesName": "Futari Ashita mo Sorenari ni"
    }, {
        "IndexName": "Expressionless-Kashiwada-san-and-Emotional-Ootakun",
        "SeriesName": "Expressionless Kashiwada-san and Emotional Oota-kun"
    }, {
        "IndexName": "Class-goto-Shuudan-Teni-Shimashita-ga",
        "SeriesName": "Class-goto Shuudan Teni Shimashita ga"
    }, {
        "IndexName": "Boushoku-Hi-no-Ken",
        "SeriesName": "Boushoku-Hi no Ken"
    }, {
        "IndexName": "Battle-in-5-Seconds-After-Meeting",
        "SeriesName": "Battle in 5 Seconds After Meeting"
    }, {
        "IndexName": "As-a-Result-of-Breaking-an-Otome-Game-the-Villainess-Young-Lady-Becomes-a-Cheat",
        "SeriesName": "As a Result of Breaking an Otome Game, the Villainess Young Lady Becomes a Cheat!"
    }, {
        "IndexName": "A-Rank-Boukensha-no-Slow-Life",
        "SeriesName": "A-Rank Boukensha No Slow Life"
    }, {
        "IndexName": "Arafoo-Shachiku-no-Golem-Master",
        "SeriesName": "Arafoo Shachiku no Golem Master"
    }, {
        "IndexName": "Alma",
        "SeriesName": "Alma"
    }, {
        "IndexName": "After-the-Holy-Sword-Reincarnates-Into-a-Human-Being-Its-Troubled-Because-It-Is-Favored-by-the-Hero",
        "SeriesName": "After the Holy Sword Reincarnates Into a Human Being, It\u2019s Troubled Because It Is Favored by the Hero"
    }, {
        "IndexName": "Mahou-Tsukai-no-Yome-Shihen75-Inazuma-Jack-to-Yousei-Jiken",
        "SeriesName": "Mahou Tsukai no Yome Shihen.75 - Inazuma Jack to Yousei Jiken"
    }, {
        "IndexName": "Fushigi-Ygi-Byakko-Senki",
        "SeriesName": "Fushigi Y\u00fbgi - Byakko Senki"
    }, {
        "IndexName": "Failed-Princesses",
        "SeriesName": "Failed Princesses"
    }, {
        "IndexName": "Venus-in-the-Blind-Spot",
        "SeriesName": "Venus in the Blind Spot"
    }, {
        "IndexName": "I-Love-You-So-Much-I-Hate-You",
        "SeriesName": "I Love You So Much, I Hate You"
    }, {
        "IndexName": "I-Dont-Know-How-to-Give-Birth",
        "SeriesName": "I Don't Know How to Give Birth!"
    }, {
        "IndexName": "GoGo-Monster",
        "SeriesName": "GoGo Monster"
    }, {
        "IndexName": "Who-Made-Me-A-Princess",
        "SeriesName": "Who Made Me A Princess"
    }, {
        "IndexName": "The-Villainess-Reverses-the-Hourglass",
        "SeriesName": "The Villainess Reverses the Hourglass"
    }, {
        "IndexName": "Survive-As-The-Heros-Wife",
        "SeriesName": "Survive As The Hero's Wife"
    }, {
        "IndexName": "The-Monster-Duchess-and-Contract-Princess",
        "SeriesName": "The Monster Duchess and Contract Princess"
    }, {
        "IndexName": "The-Kings-Avatar-Reboot",
        "SeriesName": "The King's Avatar (Reboot)"
    }, {
        "IndexName": "Sincerely-I-Became-a-Dukes-Maid",
        "SeriesName": "Sincerely: I Became a Duke's Maid"
    }, {
        "IndexName": "Please-Throw-Me-Away",
        "SeriesName": "Please Throw Me Away"
    }, {
        "IndexName": "Lady-Baby",
        "SeriesName": "Lady Baby"
    }, {
        "IndexName": "I-Am-a-Child-of-This-House",
        "SeriesName": "I Am a Child of This House"
    }, {
        "IndexName": "Cheating-Men-Must-Die",
        "SeriesName": "Cheating Men Must Die"
    }, {
        "IndexName": "Beware-of-the-Villainess",
        "SeriesName": "Beware of the Villainess!"
    }, {
        "IndexName": "A-Stepmothers-Mrchen",
        "SeriesName": "A Stepmother's Ma\u0308rchen"
    }, {
        "IndexName": "Zense-Coupling",
        "SeriesName": "Zense Coupling"
    }, {
        "IndexName": "WonDance",
        "SeriesName": "WonDance"
    }, {
        "IndexName": "Wakamono-no-Kuro-Mahou-Hanare",
        "SeriesName": "Wakamono no Kuro Mahou Hanare"
    }, {
        "IndexName": "Tsurugi-no-Joou-to-Rakuin-no-Ko",
        "SeriesName": "Tsurugi no Joou to Rakuin no Ko"
    }, {
        "IndexName": "Time-Stop-Brave",
        "SeriesName": "Time Stop Brave"
    }, {
        "IndexName": "This-Last-Boss-the-Church-in-Front-of-the-Devils-Castle",
        "SeriesName": "This Last Boss, the Church in Front of the Devil's Castle"
    }, {
        "IndexName": "The-Wolf-Lords-Lady",
        "SeriesName": "The Wolf Lord's Lady"
    }, {
        "IndexName": "The-Unsuccessful-yet-Academically-Unparalleled-Sage",
        "SeriesName": "The Unsuccessful yet Academically Unparalleled Sage"
    }, {
        "IndexName": "The-Strongest-Wizard-Becomes-a-Countryside-Guardsman-After-Taking-an-Arrow-to-the-Knee",
        "SeriesName": "The Strongest Wizard Becomes a Countryside Guardsman After Taking an Arrow to the Knee"
    }, {
        "IndexName": "The-Servant-of-the-Ultimate-Party",
        "SeriesName": "The Servant of the Ultimate Party"
    }, {
        "IndexName": "The-Galactic-Navy-Officer-Becomes-an-Adventurer",
        "SeriesName": "The Galactic Navy Officer Becomes an Adventurer"
    }, {
        "IndexName": "Sex-and-Dungeon",
        "SeriesName": "Sex and Dungeon"
    }, {
        "IndexName": "Sengoku-Komachi-Kuroutan",
        "SeriesName": "Sengoku Komachi Kuroutan"
    }, {
        "IndexName": "Reincarnated-as-an-Aristocrat-with-an-Appraisal-Skill",
        "SeriesName": "Reincarnated as an Aristocrat with an Appraisal Skill"
    }, {
        "IndexName": "Out-MIZUTA-Makoto",
        "SeriesName": "Out (MIZUTA Makoto)"
    }, {
        "IndexName": "Mutou-and-Satou",
        "SeriesName": "Mutou to Satou"
    }, {
        "IndexName": "Mikakunin-de-Shinkoukei",
        "SeriesName": "Mikakunin de Shinkoukei"
    }, {
        "IndexName": "Level-1-no-Saikyou-kenja",
        "SeriesName": "Level 1 no Saikyou kenja"
    }, {
        "IndexName": "Koryuu-Nara-Sude-de-Taosemasu-Kedo-Kore-tte-Joushiki-Janain-Desu-ka",
        "SeriesName": "Koryuu Nara Sude de Taosemasu Kedo, Kore tte Joushiki Janain Desu ka?"
    }, {
        "IndexName": "Kanojo-Hitomishirimasu",
        "SeriesName": "Kanojo, Hitomishirimasu"
    }, {
        "IndexName": "Jinrouki-Winvurga",
        "SeriesName": "Jinrouki Winvurga"
    }, {
        "IndexName": "Jiisama-ga-Iku",
        "SeriesName": "Jiisama ga Iku"
    }, {
        "IndexName": "I-Will-Live-Freely-in-Another-World-with-Equipment-Manufacturing-Cheat",
        "SeriesName": "I Will Live Freely in Another World With Equipment Manufacturing Cheat"
    }, {
        "IndexName": "Is-This-What-a-God-Tier-Game-Means",
        "SeriesName": "Is This What a God-Tier Game Means?"
    }, {
        "IndexName": "Isekai-De-Te-Ni-Ireta-Seisan-Skill-Wa-Saikyou-Datta-You-Desu",
        "SeriesName": "Isekai De Te Ni Ireta Seisan Skill Wa Saikyou Datta You Desu"
    }, {
        "IndexName": "Isekai-de-Cafe-wo-Kaiten-Shimashita",
        "SeriesName": "Isekai de Caf\u00e9 wo Kaiten Shimashita"
    }, {
        "IndexName": "I-Dont-Really-Get-It-but-It-Looks-Like-I-Was-Reincarnated-in-Another-World",
        "SeriesName": "I Don't Really Get It, but It Looks Like I Was Reincarnated in Another World"
    }, {
        "IndexName": "Honzuki-no-Gekokujou-Part-2",
        "SeriesName": "Honzuki no Gekokujou Part 2"
    }, {
        "IndexName": "Gokufuri-Kyohi-Shite-Tesaguri-Start",
        "SeriesName": "Gokufuri Kyohi Shite Tesaguri Start!"
    }, {
        "IndexName": "Fushi-no-Sougishi",
        "SeriesName": "Fushi no Sougishi"
    }, {
        "IndexName": "Frontier-Diary",
        "SeriesName": "Frontier Diary"
    }, {
        "IndexName": "Edomae-Elf",
        "SeriesName": "Edomae Elf"
    }, {
        "IndexName": "Duranki",
        "SeriesName": "Duranki"
    }, {
        "IndexName": "Dungeon-ni-Deai-wo-Motomeru-no-wa-Machigatte-Iru-Darou-ka-II",
        "SeriesName": "Dungeon ni Deai wo Motomeru no wa Machigatte Iru Darou ka II"
    }, {
        "IndexName": "By-Spring",
        "SeriesName": "By Spring"
    }, {
        "IndexName": "A-Simple-Task-of-Providing-Support-from-the-Shadows-to-Defeat-the-Demon-Lord",
        "SeriesName": "A Simple Task of Providing Support from the Shadows to Defeat the Demon Lord"
    }, {
        "IndexName": "Ankoku-Kishi-no-Ore-desu-Ga-Saikyou-no-Seikishi-wo-Mezashimasu",
        "SeriesName": "Ankoku Kishi no Ore desu Ga Saikyou no Seikishi wo Mezashimasu"
    }, {
        "IndexName": "Monster-8",
        "SeriesName": "Monster #8"
    }, {
        "IndexName": "Me-Roboco",
        "SeriesName": "Me & Roboco"
    }, {
        "IndexName": "Ghost-Reaper-Girl",
        "SeriesName": "Ghost Reaper Girl"
    }, {
        "IndexName": "To-Save-the-World-Can-You-Wake-Up-the-Morning-After-with-a-Demi-Human",
        "SeriesName": "To Save the World, Can You Wake Up the Morning After with a Demi-Human"
    }, {
        "IndexName": "Sue-Tai-chan",
        "SeriesName": "Sue & Tai-chan"
    }, {
        "IndexName": "Stellar-Witch-LIPS",
        "SeriesName": "Stellar Witch LIP\u2606S"
    }, {
        "IndexName": "Kingdom-of-Z",
        "SeriesName": "Kingdom of Z"
    }, {
        "IndexName": "Hataraku-Saibou-BABY",
        "SeriesName": "Hataraku Saibou BABY"
    }, {
        "IndexName": "Hataraku-Kesshouban-chan",
        "SeriesName": "Hataraku Kesshouban-chan"
    }, {
        "IndexName": "BL-Metamorphosis",
        "SeriesName": "BL Metamorphosis"
    }, {
        "IndexName": "Primitive-Boyfriend",
        "SeriesName": "Primitive Boyfriend"
    }];
    vm.SubscriptionFeedJSON = [];
    vm.NewSeriesLimit = 10;




    if (window.location.hash == "#email") {
        ga('send', 'event', {
            'eventCategory': "Email Click",
            'eventAction': "Home",
            'eventLabel': ""
        });
    }

    vm.PageOne = "-page-1";
    if (Cookies.get("FullPage") == "yes") {
        vm.PageOne = "";
    }

    vm.FormatDate = function (Date) {
        return moment(Date).subtract(1, 'hour').fromNow();
    };

    vm.DisplayHotSeries = function (String) {
        if (String.length >= 23) {
            return String.substring(0, 20) + "...";
        } else {
            return String;
        }
    };

    vm.ChapterDisplay = function (ChapterString) {
        var Chapter = parseInt(ChapterString.slice(1, -1));
        var Odd = ChapterString[ChapterString.length - 1];
        if (Odd == 0) {
            return Chapter;
        } else {
            return Chapter + "." + Odd;
        }
    };

    vm.ChapterURLEncode = function (ChapterString) {
        Index = "";
        var IndexString = ChapterString.substring(0, 1);
        if (IndexString != 1) {
            Index = "-index-" + IndexString;
        }

        var Chapter = parseInt(ChapterString.slice(1, -1));

        var Odd = "";
        var OddString = ChapterString[ChapterString.length - 1];
        if (OddString != 0) {
            Odd = "." + OddString;
        }

        return "-chapter-" + Chapter + Odd + Index;
    };

    vm.LatestDisplay = '2TimeAdded';
    var LatestDisplay = Cookies.get("LatestDisplay");
    if (typeof LatestDisplay !== 'undefined') {
        vm.LatestDisplay = LatestDisplay;
    }

    vm.SaveCookieLatestDisplay = function () {
        if (vm.LatestDisplay == "2TimeAdded") {
            Cookies.remove("LatestDisplay");
        } else {
            Cookies.set("LatestDisplay", vm.LatestDisplay, {
                expires: 365
            });
        }
    };

    vm.LatestLimit = 40;
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        vm.LatestLimit = 10;
    }
    vm.Extra = vm.LatestLimit;

    vm.LatestMore = function () {
        vm.LatestLimit += vm.Extra;
    };

    vm.Colors = [{
            Background: "#E9EAED",
            Label: "#333333",
            Class: "E9EAED"
        },
        {
            Background: "#363636",
            Label: "white",
            Class: "363636"
        },
        {
            Background: "#DBE2F0",
            Label: "#333333",
            Class: "DBE2F0"
        },
        {
            Background: "#000000",
            Label: "white",
            Class: "000000"
        }
    ];
    vm.ChangeBackground = function (Color) {
        $http({
            method: "POST",
            url: "background.php",
            data: {
                "Color": Color
            }
        }).then(function (b) {
            if (b.data.success) {
                vm.BackgroundColor = Color;
            } else {
                alert(b.data.val);
            }
        }, function (b) {
            alert("Unexpected Error. Please try again later.");
        });

    };

    var History = Cookies.get("History");
    if (typeof History === 'undefined') {
        vm.History = [];
    } else {
        vm.History = JSON.parse(History);
    }
    vm.ClearHistory = function () {
        Cookies.remove('History');
        vm.History = [];
    };

};
app.controller("MainCtrl", MainFunction);