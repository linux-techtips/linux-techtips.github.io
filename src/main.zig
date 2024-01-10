const std = @import("std");
const zap = @import("zap");

fn on_request(r: zap.Request) void {
    r.setStatus(.not_found);
    r.sendBody("<html><body><h1>404 - File not found</h1></body></html>") catch return;
}

pub fn main() !void {
    var listener = zap.HttpListener.init(.{
        .port = 8080,
        .on_request = on_request,
        .public_folder = "public",
        .log = true,
    });
    try listener.listen();

    std.debug.print("[127.0.0.1:8080] Listening...\n", .{});

    zap.start(.{ .threads = 2, .workers = 2 });
}
