# STEP 1
FROM golang:alpine AS hello-go-builder

WORKDIR $GOPATH/src/main/hello-world-go/
COPY . .

RUN go build -o /bin/hello-go

# STEP 2
FROM scratch

COPY --from=hello-go-builder /bin/hello-go /bin/hello-go

ENTRYPOINT ["/bin/hello-go"]