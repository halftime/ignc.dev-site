# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# Support for multi-platform builds (amd64, arm64)
ARG TARGETPLATFORM
ARG BUILDPLATFORM

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app

EXPOSE 8080
EXPOSE 8081

# This stage is used to build the service project
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
ARG TARGETPLATFORM
ARG TARGETARCH
WORKDIR /src
COPY ["ignc.dev/ignc.dev.csproj", "./ignc.dev/"]
RUN dotnet restore "./ignc.dev/ignc.dev.csproj" -a $TARGETARCH
COPY . .
WORKDIR "/src/ignc.dev"
RUN dotnet build "./ignc.dev.csproj" -c $BUILD_CONFIGURATION -o /app/build -a $TARGETARCH

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
ARG TARGETARCH
RUN dotnet publish "./ignc.dev.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false -a $TARGETARCH

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Create directory for certificates
RUN mkdir -p /app/certs

# Copy certificate directory from build context
# This approach copies the entire certs directory structure
COPY ignc.dev/certs/ /app/certs

# Set appropriate permissions for certificate files
RUN chmod 755 /app/certs && \
    find /app/certs -name "*.pem" -exec chmod 644 {} \; && \
    find /app/certs -name "*.key" -exec chmod 600 {} \; && \
    find /app/certs -name ".gitkeep" -exec chmod 644 {} \; && \
    echo "Certificate directory prepared with proper permissions"

ENTRYPOINT ["dotnet", "ignc.dev.dll"]