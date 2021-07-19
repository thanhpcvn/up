/**
 * pikvn - 
 * @authors fRzzy <frzzman@gmail.com>
 * @version v3.0.0
 * @link https://github.com/fRzzy/pikvn
 * @license 
 */
! function() {
    "use strict";

    function e(e, i) {
        this.maximumWidth = e || 1200, this.picaSettings = i || {
            quality: 3,
            alpha: !1,
            unsharpAmount: 40,
            unsharpRadius: .5,
            unsharpThreshold: 0
        }, this.pica = window.pica, this.files = {}
    }

    function i(e, i, a, t) {
        function s(e, i, a) {
            function t() {
                function e(e) {
                    console.log(e ? "pikLib: resize error" : "pikLib: resized", i + 1, "/", a.length), o.pik.processedCB(o.processed)
                }
                var t, s, o = this;
                s = document.createElement("canvas"), s.width = o.width, s.height = o.height, t = s.getContext("2d"), t.drawImage(o, 0, 0), "function" == typeof o.pik.loadedCB && o.pik.loadedCB();
                var n, p = !1;
                n = document.createElement("canvas"), o.width > o.pik.maximumWidth ? (n.width = o.pik.maximumWidth, n.height = o.height / o.width * n.width, p = !0) : (n.width = o.width, n.height = o.height), t = n.getContext("2d"), t.drawImage(o, 0, 0), o.processed.original.canvas = s, o.processed.resized.canvas = n, o.processed.current = i + 1, o.processed.total = a.length, p ? o.pik.pica.resizeCanvas(s, n, this.pik.picaSettings, e) : o.pik.processedCB(o.processed)
            }
            var s = new Image;
            s.src = window.URL.createObjectURL(e), s.pik = this, s.onload = t, s.processed = {
                resized: {},
                original: {
                    type: e.type,
                    size: e.size,
                    name: e.name,
                    lastModified: e.lastModified
                }
            }
        }
        console.log("pikLib: processing started");
        var o = this;
        o.processedCB = e, o.originalCanvas = i, o.processedCanvas = a, o.loadedCB = t, o.files.map(s, o)
    }

    function a() {
        function i(e) {
            var i = new ZeroClipboard(e.buttons),
                a = !1;
            return i.on("ready", function(t) {
                a = !0, e.buttons.text("copy").prop("disabled", !1), i.on("aftercopy", function(i) {
                    e.buttons.addClass("btn-default").removeClass("btn-success").text("copy"), $(i.target).removeClass("btn-default").addClass("btn-success").text("copied")
                })
            }), a
        }

        function a(e) {
            console.log("pikApp: file input changed");
            var i = e.data.pik,
                a = $(this)[0].files;
            0 !== a.length && ($(".pik-image").addClass("hide"), $(".pik-extra").addClass("hide"), $(".pik-container").val(""), $("#pik-status").removeClass("hide").text("loading..."), i.files = [].slice.call(a), i.process(s, $("#pik-original")[0], $("#pik-processed")[0], 1 === a.length ? t : !1))
        }

        function t() {
            $(".pik-image").addClass("hide"), $("#pik-original").removeClass("hide"), $("#pik-status").removeClass("hide").text("processing...")
        }

        function s(e) {
            function i(i) {
                1 === e.total ? o(i, e.original) : n(i, e.original)
            }
            
            console.log("pikApp: uploading", e.current, "/", e.total), 1 === e.total && ($(".pik-image").addClass("hide"), $("#pik-processed").removeClass("hide"), $("#pik-status").removeClass("hide").text("saving..."));
            var a = e.resized.canvas.toDataURL(e.original.type);
            $.post(p, {
                image: a
            }, i)
        }

        function o(e, i) { 
            e = JSON.parse(e);           
            if (e.saved) {
                console.log("pikApp: upload done for '" + i.name + "'");
                var a =  e.saved;
                $("#pik-direct-link").val(a), $("#pik-forum-code").val("[img]" + a + "[/img]"), $("#pik-common-mark").val("![" + i.name + "](" + a + ")"), $("#pik-quick-copy").removeClass("hide"), $("#pik-status").addClass("hide").text(""), $(".pik-copy-button").addClass("btn-default").removeClass("btn-success"), $("#pik-uploaded").attr("src", a), $("#pik-uploaded").load(function() {
                    $(".pik-image").addClass("hide"), $("#pik-uploaded").removeClass("hide")
                })
            } else console.log("pikApp: upload failed for '" + i.name + "'"), $("#pik-status").text("upload failed")
        }

        function n(e, i) {
            e = JSON.parse(e); 
            if (e.saved) {
                console.log("pikApp: upload done for '" + i.name + "'");
                var a = e.saved,
                    t = "[img]" + a + "[/img]",
                    s = "![" + i.name + "](" + a + ")",
                    o = $("#pik-multiple-direct-link"),
                    n = $("#pik-multiple-bbcode"),
                    p = $("#pik-multiple-markdown");
                $("#pik-status").addClass("hide"), $("#pik-multiple").removeClass("hide"), o.val(o.val() + a + "\n"), n.val(n.val() + t + "\n"), p.val(p.val() + s + "\n")
            } else console.log("pikApp: upload failed for '" + i.name + "'")
        }
        console.log("pikApp: starting app");
        var p = "api.php",
            l = p,
            d = 1200,
            c = {
                quality: 3,
                alpha: !1,
                unsharpAmount: 40,
                unsharpRadius: .5,
                unsharpThreshold: 0
            },
            r = {
                type: "file",
                multiple: !0,
                accept: "image/jpeg, image/png"
            },
            u = (window.pica, $("#pik-file-input")),
            h = new e(d, c),
            k = {
                swfPath: "/images/ZeroClipboard.swf",
                buttons: $(".pik-copy-button")
            };
        $("#pik-image-select-button").click(function() {
            u.trigger("click")
        }), u.prop(r).change({
            pik: h
        }, a), $('input[type="text"]').click(function() {
            $(this).select()
        }), $(".btn-default").click(function() {
            $(this).blur()
        }), $(".pik-tab").click(function(e) {
            $(".pik-tab").removeClass("active"), $(this).addClass("active"), $(".pik-container").addClass("hide"), $("#" + $(this).attr("link")).removeClass("hide")
        }), ZeroClipboard.config({
            swfPath: k.swfPath
        });
        i(k)
    }
    e.prototype.process = i, $(a)
}();
